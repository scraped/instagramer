<template>
    <div class="container-fluid">
        <site-header></site-header>
        <div class="row content-window">
            <site-sidebar type="basic"></site-sidebar>
            <main>
                <router-view :key="$route.fullPath" class="router-view"></router-view>
                <site-footer></site-footer>
            </main>
        </div>
    </div>
</template>
<style>
    main{
        height: 100vh;
        width: 100vw;
    }
</style>

<script type="text/babel">

    import { createHelpers } from "vuex-map-fields";

    import SiteHeader from './partials/SiteHeader';
    import SiteFooter from './partials/SiteFooter';
    import SiteSidebar from './partials/SiteSidebar';

    const { mapFields } = createHelpers({
        getterType: `global/getField`,
        mutationType: `company/updateField`
    });
    
    export default {
        components: {
            SiteHeader, SiteSidebar, SiteFooter
        },
        computed: {
            ...mapFields([
                "loading",
            ])
        }
    }
</script>