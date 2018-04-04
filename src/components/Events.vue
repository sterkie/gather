<template>
    <div class="container">
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
        <template v-if="events.length > 0">
            <div v-for="event in events" :key="event.id" class="box" @click="loadEvent(event.id)">
                {{event.title}} - {{event.location}} - {{event.creatorName}}
            </div>
        </template>
        <template v-if="events.length < 1">
            <div>
                there are currently no events planned!
            </div>
        </template>
    </div>
</template>

<script>
export default {
  name: "Events",
  computed: {
    events() {
      return this.$store.getters.events;
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