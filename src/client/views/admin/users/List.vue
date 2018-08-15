<template>

    <div class="main-content" id="carListPage">
        
        <div class="row">
            <div class="col-sm-12">
                <h2>Список пользователей
                    <router-link :to="{ name: 'adminUserCreate'}"><i class="text-success fa fa-plus"></i></router-link>
                </h2>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table">
                    <thead>
                    <tr>
                        <th>email</th>
                        <th>password</th>
                        <th>Роль</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in users" v-bind:key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.password }}</td>
                        <td>{{ user.role }}</td>
                        <td>
                            <router-link :to="{ name: 'adminUserEdit', params:{id:user.id}}"  variant="info">
                                <i class="fa fa-pencil"></i>
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import axios from 'axios';

    export default {
        data: () => ({
            users: []
        }),

        // Fetches posts when the component is created.
        created() {
            this.usersUpdate();
        },

        methods: {
            usersUpdate: function () {
                axios.get(`/api/users`)
                    .then(response => {
                        this.users = response.data;
                        console.log(this.users);
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            changeStatus: function (user) {
                axios.get(`/api/users/` + user.id + `/status`)
                    .then(response => {
                        this.usersUpdate();
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        },

    }
</script>
