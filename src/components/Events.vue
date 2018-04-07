<template>
    <div class="container">
        <div v-if="user">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <h3 class="title">Events:</h3>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <button class="button is-outlined is-info" @click="addEvent">ADD EVENT</button>
                    </div>
                </div>
            </div>
            <template v-if="sortedEvents.length > 0">
                <div v-for="event in sortedEvents" :key="event.id" class="box" @click="loadEvent(event.id)">
                    {{event.title}} - {{event.location}} - {{event.creatorName}}
                </div>
            </template>
            <template v-if="sortedEvents.length < 1">
                <div>
                    there are currently no events planned!
                </div>
            </template>
        </div>
        <div v-if="!user">You need to be logged in to see the events.</div>
    </div>

</template>

<script>
export default {
  name: "Events",
  computed: {
    events() {
      return this.$store.getters.events;
    },
    sortedEvents() {
      return this.$lodash.sortBy(this.events, "createdAt").reverse();
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    loadEvent(id) {
      this.$router.push("/events/" + id);
    },
    addEvent() {
      this.$router.push("/events/create");
    }
  }
};
</script>

<style scoped>

</style>