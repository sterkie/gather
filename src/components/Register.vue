<template>
    <div class="container">
        <form @submit.prevent="registerUser">
            <div class="field">
                <input type="text" placeholder="Enter your email..." v-model="email">
            </div>
            <div class="field">
                <input type="password" placeholder="Enter your password...." v-model="password">
            </div>
            <div class="field">
                <input type="text" placeholder="Enter desired username" v-model="username">
            </div>
            <div class="field">
                <button class="button is-small is-outlined is-info" type="submit">REGISTER</button>
                <button class="button is-small is-outlined is-warning" @click="cancelRegister">CANCEL</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      username: ""
    };
  },
  methods: {
    registerUser() {
      const tempUser = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("registerUser", tempUser);
    },
    cancelRegister() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>

</style>