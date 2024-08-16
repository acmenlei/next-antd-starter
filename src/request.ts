type DefaultOptions = {
  credentials: RequestCredentials;
  timeout: number;
  cache?: RequestCache;
};

interface successResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;

  [propName: string]: any;
}

const defaultOptions: DefaultOptions = {
  credentials: "include", // or 'same-origin'
  timeout: 30000,
};

const codeMessage: {
  [key: number]: string;
} = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的题目被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(codeMessage[response.status]) as any;
  error.response = response;
  throw error;
};
const SINGLE_OF_LOGIN = "请先登录";

/**
 * 从响应中解析 JSON
 * @param response
 */
const parseJSON = async (response: Response) => {
  const data: any = await response.clone().json();

  if (!data) {
    throw new Error("服务器异常");
  } else if (
    data?.code === 40100 &&
    !location.pathname.includes("/user/login") &&
    location.pathname !== "/"
  ) {
    // window.location.href = `/user/login?redirect=${window.location.href}`;
    throw new Error(SINGLE_OF_LOGIN);
  }
  if (data?.code !== 0) {
    throw new Error((data.message as string) ?? "服务器错误");
  }
  return data;
};

// const errorHandler = (error: any) => {
//   console.log(error, 'error')

//   const { response } = error
//   if (response && response.status) {
//     const errorText = response.statusText
//     const { status } = response
//     // You can handle response status here, throw error message
//     throw new Error(
//       codeMessage[response.status] ||
//         `Request failed, status: ${status}, message: ${errorText}`
//     )
//   } else if (!response) {
//     throw new Error('服务器发生错误，请检查服务器。')
//   }
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   return response
// }

/**
 * 参数转查询 url
 * @param params
 */
function paramToQueryString(params: { [key: string]: any }) {
  return Object.entries(params)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
}

/**
 * 远程请求（目前只支持 JSON 结构的响应）
 * @param url
 * @param options
 */
const fetcher = <T>(url: string, options: any): Promise<T> => {
  // GET
  if (options.params) {
    const query = paramToQueryString(options.params);
    url += "?" + query;
  }
  const mergedOptions: any = {
    ...defaultOptions,
    ...options,
  };
  // POST
  if (options.data) {
    mergedOptions.body = JSON.stringify(options.data);
  }
  // FormData
  if (options?.requestType === "form") {
    mergedOptions.body = options.data;
  }
  const controller = new AbortController();
  const { signal } = controller;
  setTimeout(() => controller.abort(), mergedOptions.timeout);
  return fetch(process.env.NEXT_PUBLIC_BASE_REQUEST_URL + url, {
    ...mergedOptions,
    signal,
  })
    .then(checkStatus)
    .then(parseJSON);
  // .then((data) => data as T)
  // .catch(errorHandler)
};

export default fetcher;
