<template>
    <div>
        <Header />
        <router-view></router-view>
        <!-- <Footer /> -->
    </div>
</template>

<script>
import Header from "./components/Header.vue";
// import Footer from "./components/Footer.vue";
import * as firebase from "firebase";
export default {
  name: "App",
  components: {
    Header
    // Footer
  },
  mounted() {
    if (
      this.$store.getters.user !== null &&
      this.$store.getters.user !== undefined
    ) {
      firebase
        .database()
        .ref("/events/")
        .on("value", () => {
          this.$store.dispatch("loadAllEvents");
        });
    }
  }
};
</script>

<style scoped>
body {
  height: 100%;
}
</style>