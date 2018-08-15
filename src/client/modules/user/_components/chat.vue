<template>

  <div class="main-content" id="carListPage">
    <div class="row">
      <div class="col-sm-2">
        <div class="row">
          <div class="col-sm-12">
            <h3>Аккаунты</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <ul class="list-group list-accounts">
              <router-link v-for="a in accountsList" v-if="!a.disabled" v-bind:key="a.id" class="list-group-item account" :to="{ name: 'managerChat', params:{accountId: a.id}}"
                tag="li">
                <i @click="accountToArchive(a)" class="text-danger fa fa-close"></i>
                {{ a.id }}
                <i v-if="a.unread" class="badge">{{ a.unread }}</i>
                <i v-if="a.countTodaySendMessages">{{ a.countTodaySendMessages }}</i>
              </router-link>
            </ul>
          </div>
        </div>

      </div>
      <div v-if="chat.interlocutor" class="col-sm-7">
        <h3>Чат с
          <a :href="`https://www.instagram.com/${chat.interlocutor.login}`" target="_blank">
            {{ chat.interlocutor.login }}
          </a>
        </h3>
        <p v-if="chat.error">Данный аккаунт не работает на данный момент</p>
        <ul class="list-group">
          <li v-for="(message, index) in chat.messages" v-bind:key="index" v-bind:class="{ right: message.sender === 'interlocutor' }"
            class="list-group-item">
            <p class="text">{{ message.text }}</p>
            <p class="date">{{ message.createdOn | formatDate }}</p>
          </li>
        </ul>
        <form @submit.prevent="sendMessage" class="input-group mb-3">
          <input type="text" v-model="newMessage" class="form-control">
          <div class="input-group-append">
            <button type="submit" class="btn btn-outline-secondary">Отправить</button>
          </div>
        </form>
      </div>
      <div v-else class="col-sm-7">
        <h3>Откройте чат справа</h3>
      </div>
      <div class="col-sm-3">
        <div class="row">
          <div class="col-sm-12">
            <h3>Собеседники</h3>
          </div>
          <div class="col-sm-12">
            <div class="form-group">
              <input v-model="searchText" type="text" class="form-control" placeholder="поиск">
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group">
              <div class="input-group mb-3">
                <input v-model="newInterlocutor" type="text" class="form-control">
                <div class="input-group-append">
                  <button type="button" @click="addInterlocutor(newInterlocutor)" class="btn btn-success">+</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group">
              <select class="form-control" style="height:35px; font-size: 12px;" v-model="status">
                <option v-bind:value="'all'">Все</option>
                <option v-bind:value="'favorite'">Избранные</option>
                <option v-bind:value="'pending'">Ожидающие</option>
                <option v-bind:value="'money'">Оплачено</option>
              </select>
            </div>
            <ul class="list-group">
              <li v-for="(interlocutor, index) in interlocutorsList" v-bind:key="index" @click="getChat(interlocutor.id)" class="list-group-item interlocutor"
                v-bind:class="{'active' : interlocutor.active, 'blue': !interlocutor.messages || interlocutor.messages.length === 0}" v-if="status === 'all' || ( status !== 'all' && status === interlocutor.status )">
                <span>
                  <i v-if="interlocutor.status === 'favorite'" class="fa fa-star"></i>
                  <i v-if="interlocutor.status === 'pending'" class="fa fa-hourglass"></i>
                  <i v-if="interlocutor.status === 'money'" class="fa fa-money"></i>
                  {{ interlocutor.login }}
                  <i v-if="interlocutor.unread" class="badge"></i>
                </span>
                <div class="btn-group" role="group">
                  <button v-if="interlocutor.status === null 
                    || interlocutor.status === 'pending'
                    || interlocutor.status === 'money'
                    " @click.stop="setStatus({id: interlocutor.id, status: 'favorite'})"
                    type="button" class="btn btn-secondary">
                    <i class="fa fa-star"></i>
                  </button>
                  <button v-if="interlocutor.status === null 
                    || interlocutor.status === 'favorite'
                    || interlocutor.status === 'money'
                    " @click.stop="setStatus({id: interlocutor.id, status:'pending' })"
                    type="button" class="btn btn-secondary">
                    <i class="fa fa-hourglass"></i>
                  </button>
                  <button v-if="interlocutor.status === null 
                    || interlocutor.status === 'favorite'
                    || interlocutor.status === 'pending'
                    " @click.stop="setStatus({id: interlocutor.id, status:'money' })"
                    type="button" class="btn btn-secondary">
                    <i class="fa fa-money"></i>
                  </button>
                  <button v-if="interlocutor.status === 'favorite'
                    || interlocutor.status === 'pending'
                    || interlocutor.status === 'money' "
                    @click.stop="setStatus({id: interlocutor.id, status: null })"
                    type="button" class="btn btn-secondary">
                    <i class="fa fa-close"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
    .account {
        max-height: none;
        white-space: normal;
        border-radius: 0;
        height: 35px;
        display: flex;
        align-items: center;
        padding: 10px 30px 10px 10px;
    }
    .right{
        text-align: right;
    }
    .list-group{ 
        max-height: calc(100vh - 240px);
        overflow-y: auto;
    }
    .list-accounts{
        max-height: calc(100vh - 135px) !important;
        overflow-y: auto;
        
    }
    .list-group-item{
        height: auto;
        max-height: none;
        padding: 10px;
        white-space: normal;
        display: block;
    }
    .list-group-item .date {
        margin: 0;
        font-size: 8px;
        color: grey;
    }
    .interlocutor{
        display: flex;
        justify-content: space-between;
        height: 35px;
        min-height: 35px;
        align-items: center;
        padding: 10px;
        border-radius: 0;
        cursor: pointer;
    }

    .badge{    
      background: red;
      padding: 4px;
      border-radius: 50%;
      color: white;
      width: 20px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .badge-grey{
        background: grey;
        padding: 4px;
        border-radius: 50%;
        color: white;
        width: 10px;
        height: 10px;
        display: inline-block;
    }
    .btn-secondary{
        font-size: 6px;
    }

    .blue{
      background: #c1c1e8;
    }
</style>

<script type = "text/babel">
  import {
    createHelpers
  } from "vuex-map-fields";
  import {
    mapActions,
    mapGetters
  } from "vuex";
  import store from "../../../store.js";

  const {
    mapFields
  } = createHelpers({
    getterType: `user/getField`,
    mutationType: `user/updateField`
  });

  export default {
    data: function () {
      return {
        status: 'all',
        searchText: '',
      }
    },
    computed: {
      ...mapFields([
        "accounts",
        "interlocutors",
        "chat",
        "newInterlocutor",
        "newMessage"
      ]),
      accountsList() {
        let todayStartedOn = new Date();
        todayStartedOn.setHours(0, 0, 0, 0);
        todayStartedOn = todayStartedOn.getTime() / 1000;
        let todayWillEndOn = new Date();
        todayWillEndOn.setHours(23, 59, 59, 999);
        todayWillEndOn = todayWillEndOn.getTime() / 1000;
        const accounts = [...this.accounts];
        for (let i = 0; i < accounts.length; i += 1) {
          const account = accounts[i];
          account.countTodaySendMessages = 0;
          account.unread = 0;
          for (let j = 0; j < account.interlocutors.length; j += 1) {
            const interlocutor = account.interlocutors[j];
            if (interlocutor.unread) {
              account.unread += 1;
            }
            if (interlocutor.messages && interlocutor.messages.length) {
              const message = interlocutor.messages[0];
              if (message.sender === 'account') {
                let messageCreatedOn = new Date(message.createdOn);
                messageCreatedOn = messageCreatedOn.getTime() / 1000;
                console.log(todayStartedOn)
                if (messageCreatedOn > todayStartedOn &&
                  messageCreatedOn < todayWillEndOn) {
                  account.countTodaySendMessages += 1;
                }
              }
            }
          }
        }
        return accounts;
      },
      interlocutorsList() {
        const searchText = this.searchText.toLowerCase();
        console.log(this.interlocutors);
        let interlocutors = this.interlocutors.filter((x) => {
          return x.login.indexOf(searchText) !== -1;
        })
        return interlocutors.sort(function (a, b) {
          if (!a.lastMessage) {
            if (a.createdOn > b.createdOn) {
              return -1;
            } else {
              return 1;
            }
          }
          if (a.lastMessage > b.lastMessage) {
            return -1;
          } else {
            return 1;
          }
        })

      }
    },

    methods: mapActions("user", ["accountToArchive", "getChat", "addInterlocutor", "sendMessage", "setStatus"]),

  }
</script>
