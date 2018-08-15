<template>
    <div class="back">
        <div class="register">
            <div class="brand-main">
                <img src="/assets/img/logo.svg" alt="MoveMe Logo">
            </div>
            <h1 class="white">Регистрация</h1>
            <form method="post" @submit.prevent="validateBeforeSubmit">
   
                <div :class="{'form-group' : true , 'has-danger': errors.has('phone') }">
                    <masked-input
                        class="form-control"
                        v-model="registerData.phone"
                        mask="\+\7 (111) 111-1111"/>
                </div>
                <div :class="{'form-group' : true , 'has-danger': errors.has('email') }">
                    <input type="email" class="form-control form-control-danger" placeholder="Введите email" name="email"
                        v-model="registerData.email" v-validate data-vv-rules="required|email">
                </div>
                <div  :class="{'form-group' : true , 'has-danger': errors.has('password') }">
                    <input type="password" class="form-control form-control-danger" placeholder="Введите пароль" name="password"
                        v-model="registerData.password" v-validate data-vv-rules="required">
                </div>
                <div class="form-group">
                    <label class="white"><input type="radio" value="carrier" name="type" v-model="registerData.role">Транспортная компания</label>
                </div>
                <div class="form-group">
                    <label class="white"><input type="radio" value="client" name="type" v-model="registerData.role">Клиент</label>
                </div>
                <button type="submit" class="btn btn-theme btn-full">Зарегистрироваться</button>
            
                <router-link  class="yellow" :to="{ name: 'login'}">Войти</router-link>
            </form>
            <div class="page-copyright">
                <p class="white">Made with love for great people <a class="white" href="https://linkedin.com/in/artem-chebotarevsky-2b3445104/" target="_blank">Artem Chebotarevsky</a></p>
            </div>
        </div>
    </div>

</template>

<style scoped>
    .back{
        background-image: url(/assets/img/skynight.jpg);
        background-size: cover;
        height: 100%;
    }
    .white{
        color: #ffffff;
    }
    .register{
         height: 100%;
        width: 360px;
        right: 0;
        position: absolute;
        background: rgba(0,0,0,0.5);
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    .yellow{
        color: #ffde00;
    }
    form{
        width: 100%;
    }
</style>

<script type="text/babel">
    import MaskedInput from 'vue-masked-input';

    export default {
        components: {
    
            MaskedInput,
        },
        data() {
            return {
                registerData: {
                    email: '',
                    password: '',
                    remember: '1',
                    phone: '',
                    role: '',

                },
            }
        },
        methods: {
            validateBeforeSubmit(e){
                if(!this.registerData.role){
                    // toastr['error']('Укажите роль', 'Ошибка');
                    return;
                }
                this.$validator.validateAll();
                
                if (!this.errors.any()) {
                    let registerRole = this.registerRole;
                    axios.post(`/api/auth/register`, this.registerData)
                        .then(response => {
                            Auth.login(this.registerData).then(() => {
                                this.$router.push('/profile')
                            })
                        })
                        .catch(e => {
                            // toastr['error'](e.response.data.error, 'Ошибка');
                        })
                } else {
                    // toastr['error']('Проверьте все данные', 'Ошибка');
                }
            },
        }
    }
</script>