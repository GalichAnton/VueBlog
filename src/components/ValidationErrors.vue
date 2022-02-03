<template>
  <ul class="error-messages">
    <li v-for="errorMsg in errorsMsg" :key="errorMsg">
      {errorMsg}
    </li>
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
      Object.keys(this.validationErrors).map(name =>{
        const messages = this.validationErrors[name].join(', ')
      })
    },
  },
};
</script>

<style scoped></style>
