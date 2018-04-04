import Vue from "vue";
import Router from "vue-router";
import * as firebase from "firebase";
import { routes } from "./router";
import App from "./App.vue";
import { store } from "./store";

import "./assets/styles/main.scss";

Vue.use(Router);

firebase.initializeApp({
  apiKey: "AIzaSyBeBuX2YqhkSpiWDFf2YZLVXSZ-z6Q4fzc",
  authDomain: "yolo-c0329.firebaseapp.com",
  databaseURL: "https://yolo-c0329.firebaseio.com",
  projectId: "yolo-c0329",
  storageBucket: "",
  messagingSenderId: "985826710386"
});

const router = new Router({
  mode: "history",
  routes: routes
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoLogIn", user);
        this.$store.dispatch("getUserData");
        this.$store.dispatch("loadAllEvents");
      }
    });
  }
});
