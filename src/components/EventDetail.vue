<template>
    <div class="container" v-if="event">

        <!-- <div class="columns"> -->
        <!-- <div class="column is-half"> -->
        <div class="level event-header">
            <div class="level-left">
                <div class="level-item">
                    <p class="is-size-3 has-text-weight-light">
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
                        <button class="button is-outlined is-info is-small" @click="registerForEvent">Register</button>
                    </template>
                    <template v-if="isParticipant">
                        <button class="button is-outlined is-info is-small" @click="unregisterForEvent">Unregister</button>
                    </template>
                </div>
            </div>
        </div>
        <div>
            <p>
                {{event.description}}
            </p>
        </div>
        <div class="event-status">
            <div class="notification is-info has-text-centered" v-if="event.status === 'voting'">
                <p class="heading">
                    Voting is currently in progress. You will be notified when

                    <strong>{{event.creatorName}}</strong> selects the best date. </p>
            </div>
        </div>

        <div class="vote-container box">
            <div class="date-decider">
                <DateDecider class="date-decider" :event="event" />
            </div>
            <div class="columns is-mobile">
                <div class="column is-2"></div>
                <div class="column has-text-centered" v-for="(date,index) in event.suggestedDates" :key="index">
                    <p class="heading">
                        {{date | shortdate}}
                    </p>
                </div>
            </div>
            <div class="columns is-mobile" v-for="pa in event.participants" :key="pa.id">
                <div class="column is-2 heading" :class="pa.username === user.username ? 'has-text-bold' : ''">{{pa.username}}</div>
                <div class="column has-text-centered" v-for="(sd, index) in event.suggestedDates" :key="index">
                    <div :class="isElement(pa.availableDates, sd) ? 'green' : 'red'" class="decider-item"></div>
                </div>
            </div>
        </div>
        <!-- </div> -->
        <!-- <div class="column"> -->

        <div>
            <h4 class=" is-size-4 ">Participants:</h4>
            <ul>
                <li v-for="pa in event.participants " :key="pa.id ">{{pa.username}}</li>
            </ul>
        </div>
        <!-- </div> -->
        <!-- </div> -->

        <hr>

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
.red {
  background-color: lightcoral;
}
.green {
  background-color: lightgreen;
}

.decider-item {
  height: 32px;
  width: 32px;
  margin: 0 auto;
}

.vote-container {
}

.event-status {
  margin: 16px 0px 16px 0px;
}

.date-decider {
}

.box {
  border-radius: 1px;
}

.event-header {
  border-bottom: 1px solid lightcyan;
}

.notification {
  background-color: rgb(83, 161, 224);
  color: #e4e4e4;
}
</style>