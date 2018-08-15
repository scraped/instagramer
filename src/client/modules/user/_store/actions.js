import UserAPI from "./../_api";

export const actions = {

  async get({
    commit,
    rootState,
  }) {
    try {
      let response = await UserAPI._get();
      commit("GET", response.data);
      if (response.data.user.role === 'manager') {
        let accounts = await UserAPI._getAccounts(response.data.user.id);
        for (let i = 0; i < accounts.data.length; i++) {
          accounts.data[i].unread = 0;
          let interlocutorsData = await UserAPI._getInterlocutors(accounts.data[i].id);
          let interlocutors = interlocutorsData.data;
          for (let j = 0; j < interlocutors.length; j++) {
            const messages = await UserAPI._getMessages(interlocutors[j].id);
            interlocutors[j].messages = messages.data;
          }
          accounts.data[i].interlocutors = interlocutors;
        }
        commit("GET_ACCOUNTS", accounts);
          
        const account = accounts.data.find(x => 
          x.id === rootState.route.params.accountId
        );
        console.log(account);
        commit("GET_INTERLOCUTORS", account.interlocutors);
      }
    } catch (error) {
      // router.push("/login");
    }
  },



  async getChat({
    commit,
    rootState,
    state
  }, id) {
    let chat = await UserAPI._getMessages(id);
    const interlocutor = state.interlocutors.find( x => x.id === id);
    interlocutor.unread = 0;
    await UserAPI._putInterlocutor(interlocutor, {
      unread: 0
    });
    commit("GET_CHAT", {
      chat,
      interlocutor: interlocutor,
      accountId: rootState.route.params.accountId,
    });
  },


  async addInterlocutor({
    commit,
    dispatch,
    rootState,
    state
  }) {
    if (state.newInterlocutor === '') {
      return;
    }
    let data = {
      accountId: rootState.route.params.accountId,
      login: state.newInterlocutor,
    }
    let response = await UserAPI._addInterlocutor(data);
    commit("ADD_INTERLOCUTOR", response.data);
  },

  async sendMessage({
    commit,
    dispatch,
    rootState,
    state
  }) {
    commit("CHAT_ERROR", false);
    if (state.newMessage === '') {
      return;
    }
    let data = {
      text: state.newMessage,
      accountId: rootState.route.params.accountId,
      interlocutorId: state.chat.interlocutor.id,
      sender: 'account',
      interlocutorLogin: state.chat.interlocutor.login,
    }
    let response;

    const interlocutor = state.interlocutors.find(x => x.id === state.chat.interlocutor.id);
    const account = state.accounts.find(x => x.id === rootState.route.params.accountId);
    if (!interlocutor.messages || !interlocutor.messages.length) {
      let now  = new Date();
      now = now.getTime() / 1000;
      console.log(now, now - account.timeForLastSendedMessage);
      if (!account.timeForLastSendedMessage || now - account.timeForLastSendedMessage > 40) {
        commit("SET_TIME_FOR_LAST_SENDED_MESSAGE", rootState.route.params.accountId);
      } else {
        alert('Нельзя так часто отправлять новые сообщения.')
        return;
      }
    }
    try {
      response = await UserAPI._sendMessage(data);
      console.log(response);
    } catch (e) {
      commit("CHAT_ERROR", true);
    }
    commit("UPDATE_ACCOUNTS", { 
      accountId: rootState.route.params.accountId, 
      interlocutorId: state.chat.interlocutor.id, 
      message: response.data
    });
    commit("SEND_MESSAGE", response.data);
  },


  async setStatus({
    commit,
    dispatch,
    rootState,
    state
  }, data) {
    await UserAPI._setStatus(data);
    commit("SET_STATUS", data);
  },

  
  async accountToArchive({
    commit,
    dispatch,
    rootState,
    state
  }, data) {
    await UserAPI._accountToArchive(data);
    commit("ACCOUNT_TO_ARCHIVE", data);
  },

  destroy({
    commit
  }) {
    commit("DESTROY");
  }

};