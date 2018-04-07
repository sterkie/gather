<template>
    <div class="container" v-if="event">
        <div class="level">
            <div class="level-left">
                <div class="level-item">

                    <p class="is-size-4">
                        Event:
                    </p>
                    <p class="is-size-5 has-text-weight-light">
                        {{event.title}}
                    </p>

                </div>
                <div class="level-item attending-badge">
                    <span class="tag" :class="isParticipant ? 'is-success' : 'is-danger'"> {{isParticipant ? 'Attending' : 'Not attending'}}</span>
                </div>
            </div>

            <div class="level-right">
                <div class="level-item" v-if="user">
                    <template v-if="!isParticipant">
                        <button class="button is-outlined is-info" @click="registerForEvent">Register for event</button>
                    </template>
                    <template v-if="isParticipant">
                        <button class="button is-outlined is-info" @click="unregisterForEvent">Unregister for event</button>
                    </template>
                </div>
            </div>
        </div>

        <div>
            <p>
                {{event.description}}
            </p>
        </div>
        <div>
            <h3 class="heading">
                {{event.status}}
            </h3>
        </div>
        <div>
            <DateDecider class="date-decider" :event="event" />
        </div>
        <div class="show-decider">
            <div class="columns">
                <div class="column is-2"></div>
                <div class="column has-text-centered" v-for="(date,index) in event.suggestedDates" :key="index">
                    {{date | shortdate}}
                </div>
            </div>
            <div class="columns" v-for="pa in event.participants" :key="pa.id">
                <div class="column is-2 has-text-centered">{{pa.username}}</div>
                <div class="column has-text-centered" v-for="(sd, index) in event.suggestedDates" :key="index">
                    <div>{{isElement(pa.availableDates, sd) ? 'V' : 'X'}}</div>
                </div>
            </div>
        </div>
        <hr>
        <div>
            <h4 class="is-size-4">Participants:</h4>
            <ul>
                <li v-for="pa in event.participants" :key="pa.id">{{pa.username}}</li>
            </ul>
        </div>

    </div>
</template>

<script>
import DateDecider from "./DateDecider.vue";
export default {
  props: ["id"],
  components: {
    DateDecider
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    event() {
      return this.$store.getters.event(this.id);
    },
    isParticipant() {
      if (this.participants !== undefined) {
        return this.participants.hasOwnProperty(this.$store.getters.user.id);
      } else return false;
    },
    participants() {
      return this.$store.getters.event(this.id).participants;
    },
    suggestedDates() {
      return this.$store.getters.event(this.id).suggestedDates;
    },
    hasConfirmedDates() {
      if (this.$store.getters.user.registeredEvents !== undefined) {
        let co = this.$store.getters.user.registeredEvents[
          this.$route.params.id
        ];
        return co !== undefined && co !== null ? co.confirmed : false;
      } else return false;
    }
  },
  methods: {
    registerForEvent() {
      this.$store.dispatch("registerUserForEvent", this.event);
    },
    unregisterForEvent() {
      this.$store.dispatch("unregisterUserForEvent", this.event);
    },

    isElement(pa, sd) {
      return this.$lodash.includes(pa, sd);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.attending-badge {
  margin-top: 6px;
  margin-left: 18px;
}
</style>