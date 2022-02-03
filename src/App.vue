<template>
  <div>
    <app-top-bar />
  </div>
  <router-view />
</template>

<script>
import AppTopBar from "@/components/TopBar";
export default {
  name: "App",
  components: {
    AppTopBar,
  },
};
</script>
