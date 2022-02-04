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
  isLoading: boolean;
}

const state: IAuthState = {
  isSubmitting: false,
  errors: null,
  currentUser: null,
  isLoggedIn: false,
  isLoading: false,
};

export const mutationTypes = {
  registerStart: "[auth] registerStart",
  registerSuccess: "[auth] registerSuccess",
  registerFailure: "[auth] registerFailure",

  loginStart: "[auth] loginStart",
  loginSuccess: "[auth] loginSuccess",
  loginFailure: "[auth] loginFailure",

  getCurrentUserStart: "[auth] getCurrentUserStart",
  getCurrentUserSuccess: "[auth] getCurrentUserSuccess",
  getCurrentUserFailure: "[auth] getCurrentUserFailure",
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
  [mutationTypes.getCurrentUserStart](state: IAuthState, payload) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state: IAuthState, payload) {
    state.isLoading = false;
    state.currentUser = payload;
  },
  [mutationTypes.getCurrentUserFailure](state: IAuthState, payload) {
    state.isLoading = false;
    state.errors = payload;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
};
export const actionTypes = {
  register: "[auth] register",
  login: "[auth] login",
  getCurrentUser: "[auth] getCurrentUser",
};

export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth] isAnonymous",
  getCurrentUser: "[auth] getCurrentUser",
};
const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
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

  [actionTypes.getCurrentUser](context: ActionContext<IAuthState, IState>) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then((res) => {
          context.commit(mutationTypes.getCurrentUserSuccess, res.data.user);
          resolve(res.data.user);
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure);
        });
    });
  },
};
export default { state, mutations, actions, getters };
