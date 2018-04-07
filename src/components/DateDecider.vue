<template>
    <div class="columns" v-if="!hasConfirmedDates && isParticipant">
        <div class="column is-2 ">
            <button class="button is-outlined is-info is-small" @click="submitAvailableDates">confirm</button>
        </div>
        <div class="column has-text-centered" v-for="(sd, index) in orderedDates" :key="index">
            <b-checkbox v-model="editedDates" :native-value="sd">
            </b-checkbox>
        </div>
    </div>
    <!-- <div :style="{'background-color': 'orange'}" v-if="hasConfirmedDates && isParticipant">i have confirmed</div> -->

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
      return this.$lodash.sortBy(this.event.suggestedDates, o => o);
    },
    user() {
      return this.$store.getters.user;
    },
    isParticipant() {
      let rE = this.$store.getters.event(this.$route.params.id).participants;
      return rE !== undefined && rE !== null
        ? rE.hasOwnProperty(this.user.id)
        : false;
    },
    hasConfirmedDates() {
      if (this.$store.getters.user.registeredEvents !== undefined) {
        let co = this.$store.getters.user.registeredEvents[
          this.$route.params.id
        ];
        return co !== undefined && co !== null ? co.confirmed : false;
      } else return false;
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