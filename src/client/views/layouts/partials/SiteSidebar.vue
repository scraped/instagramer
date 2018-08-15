<template>
     <div id="sidebar" class="collapse in">
            <div class="list-group panel">
                <!-- <a href="#menu1" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar" aria-expanded="false"><i class="fa fa-dashboard"></i> <span class="hidden-sm-down">Item 1</span> </a>
                <div class="collapse" id="menu1">
                    <a href="#menu1sub1" class="list-group-item" data-toggle="collapse" aria-expanded="false">Subitem 1 </a>
                    <div class="collapse" id="menu1sub1">
                        <a href="#" class="list-group-item" data-parent="#menu1sub1">Subitem 1 a</a>
                        <a href="#" class="list-group-item" data-parent="#menu1sub1">Subitem 2 b</a>
                        <a href="#menu1sub1sub1" class="list-group-item" data-toggle="collapse" aria-expanded="false">Subitem 3 c </a>
                        <div class="collapse" id="menu1sub1sub1">
                            <a href="#" class="list-group-item" data-parent="#menu1sub1sub1">Subitem 3 c.1</a>
                            <a href="#" class="list-group-item" data-parent="#menu1sub1sub1">Subitem 3 c.2</a>
                        </div>
                        <a href="#" class="list-group-item" data-parent="#menu1sub1">Subitem 4 d</a>
                        <a href="#menu1sub1sub2" class="list-group-item" data-toggle="collapse"  aria-expanded="false">Subitem 5 e </a>
                        <div class="collapse" id="menu1sub1sub2">
                            <a href="#" class="list-group-item" data-parent="#menu1sub1sub2">Subitem 5 e.1</a>
                            <a href="#" class="list-group-item" data-parent="#menu1sub1sub2">Subitem 5 e.2</a>
                        </div>
                    </div>
                    <a href="#" class="list-group-item" data-parent="#menu1">Subitem 2</a>
                    <a href="#" class="list-group-item" data-parent="#menu1">Subitem 3</a>
                </div> -->
                <template v-if="role === 'admin'">
                    <router-link class="list-group-item collapsed" to="/admin/users" tag="li">Список пользователей</router-link>
                </template>
                <template v-if="role === 'manager'">
                    <router-link v-for="a in accounts" v-bind:key="a.id"
                        class="list-group-item collapsed" :to="{ name: 'managerChat', params:{accountId: a.id}}" tag="li">{{ a.id }}</router-link>
                </template>
                <div class="sidebar-footer">
                    <a class="list-group-item collapsed"  @click="logout" tag="li">Выход</a>
                </div>
            </div>
        </div>
<!--         
    <div class="sidebar-left" id="mobile-nav">
        <div class="sidebar-body scroll-pane">
            <ul class="metismenu side-nav" id="menu">
                <li v-if="role === 'admin'" :class="{ active : isActive('/admin/users') }">
                    <router-link to="/admin/companies" tag="li"><a>Компании</a></router-link>
                    <router-link to="/admin/users" tag="li"><a>Пользователи</a></router-link>
                    <router-link to="/profile" tag="li"><a>Профиль</a></router-link>
                    <a @click="logout" tag="li">Выход</a>
                </li>
                <li v-if="role === 'driver'" :class="{ active : isActive('/admin/users') }">
                    <router-link to="/driver/orders" tag="li"><a>Список заказов</a></router-link>
                    <router-link to="/driver/orders/accepted" tag="li"><a>Мои заказы</a></router-link>
                    <router-link :to="{name: 'driverCarShow'}" tag="li"><a>Мой автомобиль</a></router-link>
                    <router-link to="/profile" tag="li"><a>Профиль</a></router-link>
                    <a @click="logout" tag="li">Выход</a>
                </li>
                <li v-if="role === 'carrier'">
                    <router-link v-if="company_id === null" to="/company/new" tag="li"><a>Зарегистрировать компанию</a></router-link>
                    <router-link v-if="company_id !== null" to="/company" tag="li"><a>Компания</a></router-link>
                    <router-link v-if="company_id !== null && company.status === 'active'" to="/company/employees" tag="li"><a>Список сотрудников</a></router-link>
                    <router-link v-if="company_id !== null && company.status === 'active'" to="/company/cars" tag="li"><a>Список автомобилей</a></router-link>
                    <router-link v-if="company_id !== null && company.status === 'active'" to="/company/orders" tag="li"><a>Список заказов</a></router-link>
                    <router-link v-if="company_id !== null && company.status === 'active'" to="/company/orders/accepted" tag="li"><a>Принятые заказы</a></router-link>
                    <router-link v-if="company_id !== null" to="/admin/company/statistic" tag="li"><a>Статистика поездок</a></router-link>
                    <router-link to="/profile" tag="li"><a>Профиль</a></router-link>
                    <a @click="logout" tag="li">Выход</a>
                </li>
                <li v-if="role === 'customer'">
                    <router-link v-if="company_id === null" to="/company/new" tag="li"><a>Создать юридическое лицо</a></router-link>
                    <router-link v-if="company_id !== null" to="/company" tag="li"><a>Юридическое лицо</a></router-link>
                    <router-link to="/orders" tag="li"><a>Список заказов</a></router-link>
                    <router-link to="/orders/new" tag="li"><a>Добавить заказ</a></router-link>
                    <router-link to="/profile" tag="li"><a>Профиль</a></router-link>
                    <a @click="logout" tag="li">Выход</a>
                </li>
            
            </ul>
        </div>
    </div> -->
</template>

<script type="text/babel">
import { createHelpers } from "vuex-map-fields";
import { mapActions, mapGetters } from "vuex";

const { mapFields } = createHelpers({
  getterType: `user/getField`,
});
export default {
    computed: {
        ...mapFields([
            "role",
            "accounts"
        ]),
    },
    methods: mapActions("auth", ["logout"])

}
</script>
