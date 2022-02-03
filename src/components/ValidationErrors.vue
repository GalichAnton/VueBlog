<template>
  <ul class="error-messages">
    <li v-for="errorMsg in errorsMsg" :key="errorMsg">{{ errorMsg }}</li>
  </ul>
</template>

<script>
export default {
  name: "AppValidationErrors",
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorsMsg() {
      return Object.keys(this.validationErrors).map((name) => {
        const messages = this.validationErrors[name].join(", ");
        return `${name} ${messages}`;
      });
    },
  },
};
</script>

<style scoped></style>
