<template>
    <header class="site-header">
        <span href="#sidebar" class="menu" data-toggle="collapse"><i class="fa fa-navicon fa-lg"></i></span>

        <!--<ul class="action-list">-->
            <!--<li>-->
                <!--<a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="avatar"><img src="/assets/img/avatars/avatar.png" alt="Avatar"></a>-->
                <!--<div class="dropdown-menu dropdown-menu-right notification-dropdown">-->
                    <!--<router-link class="dropdown-item" to="/admin/profile"><i class="fa fa-user"></i> Профиль</router-link>-->
                    <!--<a href="#" class="dropdown-item" @click.prevent="logout"><i class="fa fa-sign-out"></i> Выйти</a>-->
                <!--</div>-->
            <!--</li>-->
        <!--</ul>-->
    </header>
</template>


<script type="text/babel">

    import Layout from '../../../helpers/layout'

    export default {
        created(){

            // Echo.channel('orders')
            //     .listen('.orders.create', (e) => {
            //         let type = 'грузоперевозка';
            //         if(e.order.type === 1){
            //             type = 'эвакуация';
            //         }
            //         toastr['success'](`Тип: ${type}. Стоимость: ${e.order.price}`, 'Новый заказ');
            //         console.log(e);
            //     });
        },
        methods : {
            onNavToggle(){
                Layout.toggleSidebar()
            },
        }

    }
</script>