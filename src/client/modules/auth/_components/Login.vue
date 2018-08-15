<template>
    <div class="login-wrapper login-page">
        <div class="login-box">

            <form  @submit.prevent="login"> 
                <div class="form-group">
                    <input type="text" class="form-control form-control-danger" placeholder="Введите email" v-model="email">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control form-control-danger" placeholder="Введите пароль" v-model="password">
                </div>
                <div class="login-buttons">
                    <!-- <router-link :to="{ name: 'register'}">Зарегистрироваться</router-link> -->
                    <button type="submit" class="btn btn-default btn-login">Войти</button>
            
                </div>
            </form>

            <div class="page-copyright">
                <p>Made with love for great people
                    <a href="https://linkedin.com/in/artem-chebotarevsky-2b3445104/" target="_blank">Artem Chebotarevsky</a>
                </p>
            </div>

        </div>
    </div>
</template>

<style lang="css" scoped>
    .login-wrapper{
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn-login{
        width: 100%;
    }
</style>

<script type="text/babel">
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";

const { mapFields } = createHelpers({
  getterType: `user/getField`,
  mutationType: `user/updateField`
});

export default {
  computed: {
    ...mapFields(["email", "password"])
  },
  methods: mapActions("auth", ["login"])
};
</script>