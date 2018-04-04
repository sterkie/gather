<template>
    <div>
        <Header />
        <router-view></router-view>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import * as firebase from "firebase";
export default {
  name: "App",
  components: {
    Header
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

</style>