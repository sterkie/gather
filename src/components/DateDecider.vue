<template>
    <div class="decider-container box">
        <div class="columns">
            <div class="column is-2"></div>
            <div class="column has-text-centered" v-for="(date, index) in suggestedDates" :key="index">{{date | date}}</div>
        </div>
        <div class="columns" v-for="person in participants" :key="person.id">
            <div class="column is-2 has-text-centered participants--column">{{person.username}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: "DateDecider",
  props: ["suggestedDates", "participants"]
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