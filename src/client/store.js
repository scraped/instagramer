import Vue from "vue";
import Vuex from "vuex";
import globalModule from "./modules/global/_store";
import authModule from "./modules/auth/_store";
import userModule from "./modules/user/_store";
import { createModule } from "vuex-toast";
import UserAPI from "./modules/user/_api/index"
function compare(a, b) {
  if (a.lastMessage > b.lastMessage)
      return -1;
  if (a.lastMessage < b.lastMessage)
      return 1;
  return 0;
}
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connect: false,
    message: null
  },
  mutations:{
      SOCKET_CONNECT: (state,  status ) => {
          state.connect = true;
      },
      SOCKET_UMESSAGE: async (state,  message) => {
        console.log(message);
        let m = message[0];
        if (state.user.chat.interlocutor.id === m.interlocutorId) {
          state.user.chat.messages.unshift(m);
          await UserAPI._putInterlocutor(state.user.chat.interlocutor, {unread: 0});
          return;
        }
        for( let i = 0; i < state.user.accounts.length; i++){
          if(state.user.accounts[i].id === m.accountId){
            const account = state.user.accounts[i];
            const interlocutorIndex = account.interlocutors.findIndex(x => x.id === m.interlocutorId);
            state.user.accounts[i].interlocutors[interlocutorIndex].unread = 1;
          }
        }
        for( let i = 0; i < state.user.interlocutors.length; i++){
          if(state.user.interlocutors[i].id === m.interlocutorId){
            state.user.interlocutors[i].unread = 1;
            state.user.interlocutors[i].lastMessage = new Date().getTime();
          }
        }
        state.user.interlocutors = state.user.interlocutors.sort(compare);
      }
  },
  modules: {
    toast: createModule({
      dismissInterval: 8000
    }),
    global: globalModule,
    auth: authModule,
    user: userModule,
  }
});
