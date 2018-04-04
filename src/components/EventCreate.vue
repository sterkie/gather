<template>
    <div class="container">
        <h3 class="title">Add an event</h3>
        <form @submit.prevent="addEvent">
            <div class="field">
                <input type="text" placeholder="enter a title for the event" v-model="title" class="input">
            </div>
            <div class="field">
                <input type="text" placeholder="enter a location for the event" v-model="location" class="input">
            </div>
            <div class="field">
                <button class="button is-small is-outlined is-info" type="submit">ADD EVENT</button> -----
                <button class="button is-small is-outlined is-warning" @click="cancelCreate" type="reset">CANCEL</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: "EventCreate",
  data() {
    return {
      title: "",
      location: ""
    };
  },
  methods: {
    addEvent() {
      const tempEvent = {
        title: this.title,
        location: this.location,
        creatorId: this.$store.getters.user.id,
        creatorName: this.$store.getters.user.username,
        createdAt: new Date()
      };
      this.$store.dispatch("addEvent", tempEvent);
    },

    cancelCreate() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>

</style>