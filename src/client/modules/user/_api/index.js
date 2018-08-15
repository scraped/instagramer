import axios from "axios";

class UserAPI {

    static _get() {
        return axios
            .get("/api/user")
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }
    static _getAccounts(id) {
        return axios
            .get("/api/accounts/?userId=" + id)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }
    static _putAccount(id, data) {
        return axios
            .put("/api/accounts/" + id, data)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    static _putInterlocutor(interlocutor, data) {
        return axios
            .put("/api/interlocutors/" + interlocutor.id, data)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }
    static _getInterlocutors(id) {
        return axios
            .get(`/api/interlocutors/?accountId=${id}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    static _getMessages(id) {
        return axios
            .get(`/api/messages/?interlocutorId=${id}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    
    static _sendMessage(data) {
        return axios
            .post(`/api/messages/`, data)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    static _addInterlocutor(data){
        return axios
            .post(`/api/interlocutors`, data)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    static _setStatus(data){
        return axios
            .put(`/api/interlocutors/${data.id}`, {status: data.status})
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    static _accountToArchive(data){
      return axios
          .put(`/api/accounts/${data.id}`, {disabled: true})
          .then(response => {
              return response;
          })
          .catch(error => {
              throw error;
          });
  }
}

export default UserAPI;
