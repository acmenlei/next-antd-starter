import { useSelector } from "@/stores/config";
import useUserStore from "@/stores/user";
import { isExpires } from "@/utils/check";

/**
 * 用户权限
 */
export default function useAccess() {
  const { loginUser } = useUserStore(useSelector("loginUser"));

  return {
    canUser: !!loginUser,
    canVip: loginUser?.role === "vip" && !isExpires(loginUser?.vipExpires),
    canAccess: loginUser?.role === "admin",
    canGuest: loginUser?.role === "guest",
  };
}
