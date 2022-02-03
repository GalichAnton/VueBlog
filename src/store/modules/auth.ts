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
  loginStart: "[auth] loginStart",
  loginSuccess: "[auth] loginSuccess",
  loginFailure: "[auth] loginFailure",
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
  [mutationTypes.loginStart](state: IAuthState) {
    state.isSubmitting = true;
    state.errors = null;
  },
  [mutationTypes.loginSuccess](state: IAuthState, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailure](state: IAuthState, payload) {
    state.isSubmitting = false;
    state.errors = payload;
  },
};
export const actionTypes = {
  register: "[auth] register",
  login: "[auth] login",
};
const actions = {
  [actionTypes.register](
    context: ActionContext<IAuthState, IState>,
    credentials
  ) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart);
      authApi
        .register(credentials)
        .then((res) => {
          context.commit(mutationTypes.registerSuccess, res.data.user);
          setItem("accessToken", res.data.user.token);
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

  [actionTypes.login](context: ActionContext<IAuthState, IState>, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart);
      authApi
        .login(credentials)
        .then((res) => {
          context.commit(mutationTypes.loginSuccess, res.data.user);
          setItem("accessToken", res.data.user.token);
          resolve(res.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.loginFailure,
            result.response.data.errors
          );
        });
    });
  },
};
export default { state, mutations, actions };
