<template>
    <div class="main-content">
        <div class="page-header">
            <h3 class="page-title">
                Редактирование {{ item.id }}
            </h3>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        Данные пользователя
                    </div>
                    <div class="card-block">
                        
                        <div class="row">
                            
                            <div class="form-group col-sm-6">
                                <label>Email</label>
                                <input type="text" class="form-control" disabled v-model="item.id">
                            </div>
                            <div class="form-group col-sm-6">
                                <label>Пароль</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    v-model="item.password"/>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" v-on:click="update">Обновить</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        Привязанные аккаунты
                    </div>
                    <div class="card-block">
                        
                        <div class="row" v-for="(a, i) in accounts" v-bind:key="i">
                            
                            <div class="form-group col-sm-5">
                                <label>Логин</label>
                                <input type="text" v-bind:class="{'form-control-danger': a.error}" class="form-control" v-model="a.id">
                                <small v-if="a.error" class="text-danger" >Подтвердите вход через мобильный девайс и после этого повторите попытку</small>
                            </div>
                            <div class="form-group col-sm-5">
                                <label>Пароль</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    v-model="a.password"/>
                            </div>
                            <div class="form-group col-sm-2">
                                <label>Действия</label>
                                <button v-if="a.status === 'new'" class="btn btn-primary" v-on:click="save(a, i)">Сохранить</button>
                                <button v-if="a.status !== 'new'" class="btn btn-primary" v-on:click="edit(a)">Обновить</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" v-on:click="add">Добавить аккаунты</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">

export default {
    data: () => ({
        model: 'users',
        item: {},
        accounts: [],
    }),

    created() {
        axios
            .get("/api/" + this.model + "/" + this.$route.params.id)
            .then(response => {
                console.log(response);
                this.item = response.data;
                axios
                    .get("/api/accounts/?userId=" + this.item.id)
                    .then(response => {
                        this.accounts = response.data;
                    })
            });
    },

    methods: {
        update: function (status) {
            axios.put(`/api/${this.model}/${this.$route.params.id}`, this.item)
                .then(response => { 
                    router.push('/admin/users');
                    toastr['success']('Пользователь был успешно обновлен', 'Успех');
                })
                .catch(e => {
                    toastr['error'](e, 'Ошибка');
                });
        },
        save: function (a, i) {
            this.accounts[i].error = false; //изменил
            console.log('sd');
            console.log(a);
            axios.post(`/api/accounts/`, a)
                .then(response => { 
                    this.accounts[i].status = true;
                    router.push('/admin/users');
                    toastr['success']('Пользователь был успешно обновлен', 'Успех');
                })
                .catch(e => {
                    this.accounts[i].error = true;
                    this.$forceUpdate()
                    toastr['error'](e, 'Ошибка');
                });
        },

        add: function () {
            this.accounts.push({id: "", password: "", userId: this.item.id, status:'new'});
        }
    }
}
</script>
