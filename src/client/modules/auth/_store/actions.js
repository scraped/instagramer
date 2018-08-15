import AuthAPI from "./../_api/";
import { ADD_TOAST_MESSAGE } from "vuex-toast";
import router from "./../../../router";
import Ls from "./../../../services/ls";

export const actions = {


    async login({ dispatch, commit, state, rootState }) {
        let data = { email: rootState.user.email, password: rootState.user.password };
        try {
            let response = await AuthAPI._login(data);
            Ls.set('auth.token',response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    
            commit("LOGIN", response.data.token);
            dispatch('user/get', null, { root: true });
            if(response.data.user.role === 'admin'){
                router.push("/admin/users");
            } else {
                router.push("/manager/");
            }
        } catch (error) {
            dispatch(
                ADD_TOAST_MESSAGE,
                { text: error.data.message, type: "danger" },
                { root: true }
            );
        }
    },

    register({ commit }) {
        commit("REGISTER");
    
    },
    
    logout({ commit, dispatch }) {
        Ls.remove('auth.token');
        axios.defaults.headers.common['Authorization'] = ``;
        dispatch('user/destroy', null, { root: true });
        router.push("/login");
    },

    
    async check({ commit, dispatch }, token) {
        try {
            let auth = await AuthAPI._check();
            commit("LOGIN", token);
            Ls.set('auth.token', token);
            dispatch('user/get', null, { root: true });
            if(window.location.pathname === '/login'){
                router.push("/admin/users");
            }
            return true;
        } catch (error) {
            router.push("/login");
        }
    },
};
