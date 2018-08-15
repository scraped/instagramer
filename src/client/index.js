import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import axios from "axios";
import router from "./router.js";
import store from "./store";
import { sync } from "vuex-router-sync";
import moment from 'moment'

Vue.use(VueRouter);
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
})
window.axios = require("axios");
// window.moment = require("moment");


// Vue.filter("formatDate", function (value) {
//     if (value) {
//         moment.locale("ru");
//         return moment(String(value)).format(" DD MMMM в HH:mm");
//     }
// });



const unsync = sync(store, router);

import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, 'http://localhost:3001', store);

new Vue({
    el: "#app",
    render: h => h(App),
    router,
    store
});
