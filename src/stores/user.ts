import { create } from "zustand";

type UserState = { loginUser?: any }; // todo【any 改为真实的类型】

type UserAction = {
  setLoginUser: (user: any) => void;
};

/**
 * 当前登录用户的数据
 */
const useUserStore = create<UserState & UserAction>((set) => ({
  // state
  loginUser: undefined,
  // actions
  setLoginUser: (loginUser) => set(() => ({ loginUser })),
}));

export default useUserStore;
