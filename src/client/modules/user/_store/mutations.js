import { updateField } from "vuex-map-fields";

function compare(a, b) {
  if (parseInt(a.lastMessage) > parseInt(b.lastMessage))
      return -1;
  if (parseInt(a.lastMessage) < parseInt(b.lastMessage))
      return 1;
  return 0;
}

export const mutations = {
  updateField,
  
  GET: (state, data) => {
    state.email = data.user.id;
    state.role = data.user.role;
  },
  GET_ACCOUNTS: (state, data) => {
    console.log(data);
    state.accounts = data.data;
  },

  REGISTER: state => {
  },

  DESTROY: state => {
    for (var field in state) {
      state[field] = "";
    }
  },
  
  
  GET_INTERLOCUTORS: (state, data) => {
    console.log(data);
    state.interlocutors = data.sort(compare);
  },

  
  GET_CHAT: (state, data) => {
    console.log(data.chat.data);
    state.chat = {
      messages: [],
      interlocutor: "",
      error: false,
    },
    state.chat.messages = data.chat.data.reverse();
    state.chat.interlocutor = data.interlocutor;
    const accountIndex = state.accounts.findIndex(x => x.id === data.accountId);
    const interlocutorIndex = state.accounts[accountIndex].interlocutors.findIndex(x => x.id === data.interlocutor.id);
    state.accounts[accountIndex].interlocutors[interlocutorIndex].unread = 0;;
 
  },

  ADD_INTERLOCUTOR: (state, data) => {
    state.interlocutors.push(data);
    state.newInterlocutor = '';
  },

  

  SEND_MESSAGE: (state, data) => {
    state.chat.messages.unshift(data);
    state.newMessage = '';
  },

  
  SET_STATUS: (state, data) => {
    for (let i = 0; i < state.interlocutors.length; i++) {
      if (state.interlocutors[i].id === data.id) {
        state.interlocutors[i].status = data.status;
      }
    }
  },

  ACCOUNT_TO_ARCHIVE: (state, data) => {
    const index = state.accounts.findIndex(x => x.id === data.id);
    state.accounts[index].disabled = true;
  },

  CHAT_ERROR: (state, data) => {
    state.chat.error = data;
  },

  SET_TIME_FOR_LAST_SENDED_MESSAGE: (state, accountId) => {
    const time = new Date();
    const accountIndex = state.accounts.findIndex(x => x.id === accountId);
    state.accounts[accountIndex].timeForLastSendedMessage = time.getTime() / 1000;
  },
  
  UPDATE_ACCOUNTS: (state, data) => {
    const accountIndex = state.accounts.findIndex(x => x.id === data.accountId);
    const interlocutorIndex = state.accounts[accountIndex].interlocutors.findIndex(x => x.id === data.interlocutorId);
    if (!state.accounts[accountIndex].interlocutors[interlocutorIndex].messages) {
      state.accounts[accountIndex].interlocutors[interlocutorIndex].messages = [];
    }
    state.accounts[accountIndex].interlocutors[interlocutorIndex].messages.unshift(data.message);
  },
};
