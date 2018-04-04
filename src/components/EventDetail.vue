<template>
    <div class="container" v-if="event">
        <div class="level">
            <div class="level-left">
                <h3 class="title">
                    the event page for {{event.title}}
                </h3>
            </div>
            <div class="level-right">
                <div class="level-item">
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

        </div>
        <div>
            <h4 class="is-size-4">Participants:</h4>
            <ul>
                <li v-for="pa in event.participants" :key="pa.id">{{pa.username}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      //   event: {},
      //   participants: {}
    };
  },
  computed: {
    event() {
      return this.$store.getters.event(this.id);
    },
    isParticipant() {
      return this.participants.hasOwnProperty(this.$store.getters.user.id);
    },
    participants() {
      return this.$store.getters.event(this.id).participants;
    }
  },
  methods: {
    registerForEvent() {
      this.$store.dispatch("registerUserForEvent", this.event);
    },
    unregisterForEvent() {
      console.log("unregistered");
    }
  },
  created() {}
};
</script>

<style scoped>

</style>