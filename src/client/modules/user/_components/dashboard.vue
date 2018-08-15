<template>

    <div class="main-content" id="carListPage">
        
        <div class="row">
            <div class="col-sm-12">
                <h2>Список аккаунтов</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Логин</th>
                        <th>Пароль</th>
                        <th>Новых сообщений</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="a in accounts" v-bind:key="a.id">
                        <td>{{ a.id }}</td>
                        <td>{{ a.password }}</td>
                        <td>0</td>
                        <td>
                            <router-link :to="{ name: 'managerChat', params:{accountId: a.id}}"  variant="info">
                                Открыть чат
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
    import { createHelpers } from "vuex-map-fields";
    import { mapActions, mapGetters } from "vuex";
    

    const { mapFields } = createHelpers({
        getterType: `user/getField`,
        mutationType: `user/updateField`
    });

    export default {

        computed: {
            ...mapFields([
                "accounts",
            ]),
        }
    }
</script>
