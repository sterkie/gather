<template>
    <div class="container">
        <form @submit.prevent="loginUser">
            <div class="field">
                <input type="text" placeholder="Enter your email..." v-model="email" class="input">
            </div>
            <div class="field">
                <input type="password" placeholder="Enter your email..." v-model="password" class="input">
            </div>
            <div class="field">
                <button class="button is-small is-outlined is-info" type="submit">LOG IN</button>
                <button class="button is-small is-outlined is-warning" @click="cancelLogin">CANCEL</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginUser() {
      const tempUser = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("logInUser", tempUser);
    },
    cancelLogin() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>

</style>