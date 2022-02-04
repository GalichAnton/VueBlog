import { createStore } from "vuex";
import auth, { IAuthState } from "@/store/modules/auth";
import feed from "@/store/modules/feed.js";
export interface IState {
  auth: IAuthState;
}
export default createStore({
  state: {} as IState,
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
  },
});
