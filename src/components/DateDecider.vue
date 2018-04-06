<template>
    <div class="decider-container box">
        <p class="is-size-6">You are currently marked as:
            <strong>{{isParticipant ? 'attending' : 'not attending'}}</strong>
        </p>
        <div class="date-selection-container" v-if="isParticipant">
            <p class="subtitle">Please select the days you're available at: </p>
            <b-checkbox v-model="editedDates" :native-value="sd" v-for="(sd, index) in orderedDates" :key="index">
                {{sd | date}}
            </b-checkbox>
            <div class="field">
                <button class="button is-outlined is-info is-small" @click="submitAvailableDates">confirm</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "DateDecider",
  props: ["event"],
  data() {
    return {
      availableDates: [],
      editedDates: []
    };
  },
  methods: {
    submitAvailableDates() {
      let sorted = this.$lodash.sortBy(this.editedDates, o => o);
      this.$store.dispatch("submitAvailableDates", {
        dates: this.editedDates,
        event: this.event
      });
    }
  },
  computed: {
    participants() {
      return this.$store.getters.event(this.$route.params.id).participants;
    },
    orderedDates() {
      return this.$lodash.sortBy(this.event.suggestedDates, o => {
        return o;
      });
    },
    user() {
      return this.$store.getters.user;
    },
    isParticipant() {
      let rE = this.$store.getters.event(this.$route.params.id).participants;
      return rE !== undefined && rE !== null
        ? rE.hasOwnProperty(this.user.id)
        : false;
    }
  }
};
</script>

<style scoped>
.participants--column {
  border-right: 1px solid aqua;
}

.box {
  border-radius: 1px;
}
</style>