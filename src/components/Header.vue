<template>
    <nav class="navbar is-transparent">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    <h3 class="title">EVENTOR</h3>
                </router-link>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <router-link class="navbar-item" to="/events">
                        Events
                    </router-link>
                    <router-link class="navbar-item" to="/events/create">
                        Create Event
                    </router-link>
                    <router-link class="navbar-item" to="/login">
                        Login
                    </router-link>
                    <router-link class="navbar-item" to="/register">
                        Register
                    </router-link>
                    <a class="navbar-item" @click="logOut">
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
  }
};
</script>

<style scoped>

</style>