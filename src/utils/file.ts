/**
 * 读取文件中的内容
 * @param file
 * @returns
 */
export const readFileContent = (file: File) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("未选择文件"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("读取文件内容失败"));
      }
    };
    reader.onerror = () => {
      reject(new Error("读取文件内容失败"));
    };
    reader.readAsText(file);
  });
};

/**
 * 获取遗传url中的文件名
 * @param url
 * @returns
 */
export const getFileName = (url: string) => {
  // 解析URL并获取路径
  const path = new URL(url).pathname;
  // 获取最后一个斜杠后的内容，即文件名
  const fileName = path.substring(path.lastIndexOf("/") + 1);
  return fileName;
};

/**
 * 提供url来下载文件
 * @param url
 */
export const downloadFile = (url: string, filename?: string) => {
  const link = document.createElement("a");
  link.download = filename ?? getFileName(url);
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
