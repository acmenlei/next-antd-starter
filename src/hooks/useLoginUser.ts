import { useSelector } from "@/stores/config";
import useUserStore from "@/stores/user";

/**
 * 获取当前登录用户信息
 * @returns
 */
export default function useLoginUser() {
  const { loginUser } = useUserStore(useSelector("loginUser"));

  return loginUser;
}
