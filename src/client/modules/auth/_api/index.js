import axios from "axios";

class AuthAPI {
    static _login(data) {
        //TODO FIX THIS EMAIL TO ID
        data.id = data.email;
        return axios
            .post('/login', data)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error.response;
            });
    } 

    static _check() {
        return axios
            .get("/check")
            .then(response => {
                return true;
            })
            .catch(error => {
                throw error;
            });
    }


    static _get() {
        return axios
            .get("/api/profile")
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }
}

export default AuthAPI;
