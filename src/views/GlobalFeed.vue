<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed :api-url="apiUrl"></app-feed>
        </div>
        <div class="col-md-3">POPULAR TAGS</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from "@/components/Feed.vue";
export default {
  name: "McvGlobalFeed",
  components: {
    AppFeed,
  },
  data() {
    return {
      apiUrl: "/articles",
    };
  },
};
</script>
