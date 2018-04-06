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
                <DatePicker :multi="true" v-model="suggestedDates" />
            </div>
            <div class="field">
                <button class="button is-small is-outlined is-info" type="submit">ADD EVENT</button> -----
                <button class="button is-small is-outlined is-warning" @click="cancelCreate" type="reset">CANCEL</button>
            </div>
        </form>
    </div>
</template>

<script>
import moment from "moment";
import DatePicker from "./DatePicker.vue";
export default {
  name: "EventCreate",
  components: {
    DatePicker
  },
  data() {
    return {
      title: "",
      location: "",
      suggestedDates: []
    };
  },
  methods: {
    addEvent() {
      const processedDates = [];
      this.suggestedDates.map(date => {
        processedDates.push(moment(date).format("YYYY-MM-DD"));
      });
      const tempEvent = {
        title: this.title,
        location: this.location,
        creatorId: this.$store.getters.user.id,
        creatorName: this.$store.getters.user.username,
        createdAt: new Date(),
        suggestedDates: processedDates
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