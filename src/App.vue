<template>
  <div>
    <app-top-bar />
  </div>
  <router-view />
</template>

<script>
import AppTopBar from "@/components/TopBar";
import { actionTypes } from "@/store/modules/auth";

export default {
  name: "App",
  components: {
    AppTopBar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
};
</script>
