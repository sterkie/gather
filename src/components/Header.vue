<template>
    <nav class="navbar is-transparent">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    <h3 class="title has-text-weight-light">GATHER</h3>
                </router-link>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <p class="navbar-item" :style="{'margin-top': '6px'}" v-if="user">welcome {{user.username}}</p>
                </div>
                <div class="navbar-end ">
                    <router-link class="navbar-item " to="/events" v-if="user !== null">
                        Events
                    </router-link>
                    <router-link class="navbar-item " to="/login" v-if="!user">
                        Login
                    </router-link>
                    <router-link class="navbar-item " to="/register" v-if="!user">
                        Register
                    </router-link>
                    <a class="navbar-item " @click="logOut " v-if="user !== null">
                        Logout
                    </a>

                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push("/");
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style scoped>

</style>