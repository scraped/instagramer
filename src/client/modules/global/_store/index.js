import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { defaultState } from "./defaultState";
export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
};
