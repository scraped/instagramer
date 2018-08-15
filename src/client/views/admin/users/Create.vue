<template>
    <div class="main-content">
        <div class="page-header">
            <h3 class="page-title">
                Новый пользователь
            </h3>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-block">
                        
                        <div class="row">
                            
                            <div class="form-group col-sm-6">
                                <label>Email</label>
                                <input type="text" class="form-control" v-model="item.id">
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
                </div>
                <button class="btn btn-primary" v-on:click="create">Создать</button>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">

export default {
    data: () => ({
        model: 'users',
        item: {
            role: 'manager',
        },
    }),


    methods: {
        create: function (status) {
            axios.post(`/api/${this.model}`, this.item)
                .then(response => { 
                    location.href = '/admin/users';
                    toastr['success']('Пользователь был успешно создан', 'Успех');
                })
                .catch(e => {
                    toastr['error'](e, 'Ошибка');
                });
        },
    }
}
</script>
