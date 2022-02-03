import { createStore } from "vuex";
import auth, { IAuthState } from "@/store/modules/auth";
export interface IState {
  auth: IAuthState;
}
export default createStore({
  state: {} as IState,
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
});
