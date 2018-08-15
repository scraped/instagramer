import { updateField } from "vuex-map-fields";

export const mutations = {
  updateField,
  LOGIN: (state, token, router) => {
    state.auth = true;
  },
  
  GET: (state, data) => {
    state.email = data.email;
    state.phone = data.phone;
    state.role = data.role;
    state.company_id = data.company_id;
    state.name =  data.name;
    state.series_of_passport =  data.series_of_passport;
    state.number_of_passport =  data.number_of_passport;
    state.issued =  data.issued;
    state.date =  data.date;
    state.code =  data.code;
    state.when =  data.when;
  },

  REGISTER: state => {

  },
};
