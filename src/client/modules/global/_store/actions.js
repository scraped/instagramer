import CompanyAPI from "./../_api/";
import { ADD_TOAST_MESSAGE } from "vuex-toast";
import router from "./../../../router";
import Ls from "./../../../services/ls";

export const actions = {
        
    startLoading({ commit }) {
        commit("START_LOADING");
    },
            
    stopLoading({ commit }) {
        commit("STOP_LOADING");
    },

};
