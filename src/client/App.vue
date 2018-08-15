<template>
  <div>
    <router-view></router-view>
    <toast position="ne"></toast>
  </div>
</template>

<script>
import { Toast } from "vuex-toast";
import store from "./store";
export default {
  components: {
    Toast
  },
};
</script>