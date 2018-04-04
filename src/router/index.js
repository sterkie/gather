import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Events from "../components/Events.vue";
import EventCreate from "../components/EventCreate";
import EventDetail from "../components/EventDetail";

export const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/events", component: Events },
  { path: "/events/create", component: EventCreate },
  { path: "/events/:id", props: true, component: EventDetail }
];
