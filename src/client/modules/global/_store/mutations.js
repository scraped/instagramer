import { updateField } from "vuex-map-fields";

export const mutations = {
  updateField,
  
  START_LOADING: (state, data) => {
    state.loading = true;
  },
  
  STOP_LOADING: (state, data) => {
    state.loading = false;
  },
};
