import { ActionContext } from "vuex";
import { IState } from "@/store";
import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";
export interface IUser {
  userName: string;
  email: string;
}
export interface IAuthState {
  isSubmitting: boolean;
  currentUser: IUser | null;
  errors: string | null;
  isLoggedIn: boolean;
}
const state: IAuthState = {
  isSubmitting: false,
  errors: null,
  currentUser: null,
  isLoggedIn: false,
};

export const mutationTypes = {
  registerStart: "[auth] registerStart",
  registerSuccess: "[auth] registerSuccess",
  registerFailure: "[auth] registerFailure",
};
const mutations = {
  [mutationTypes.registerStart](state: IAuthState) {
    state.isSubmitting = true;
    state.errors = null;
  },
  [mutationTypes.registerSuccess](state: IAuthState, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state: IAuthState, payload) {
    state.isSubmitting = false;
    state.errors = payload;
  },
};
export const actionTypes = {
  register: "[auth] register",
};
const actions = {
  [actionTypes.register](
    context: ActionContext<IAuthState, IState>,
    credentials
  ) {
    return new Promise((resolve) => {
      context.commit("registerStart");
      authApi
        .register(credentials)
        .then((res) => {
          context.commit(mutationTypes.registerStart, res.data.user);
          setItem(mutationTypes.registerSuccess, res.data.user.token);
          resolve(res.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.errors
          );
        });
    });
  },
};
export default { state, mutations, actions };
