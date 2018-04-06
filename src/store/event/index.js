import * as firebase from "firebase";

const state = {
  events: []
};

const mutations = {
  loadAllEvents(state, payload) {
    state.events = payload;
  },

  addEvent(state, payload) {
    state.events.push(payload);
  },

  addParticipant(state, payload) {
    const index = state.events.findIndex(event => event.id === payload.eventId);
    const event = state.events.find(event => event.id === payload.eventId);
    event.participants = {
      ...event.participants,
      [payload.userId]: { id: payload.userId, username: payload.userName }
    };
    state.events.splice(index, 1, event);
  },

  removeParticipant(state, payload) {
    const index = state.events.findIndex(event => event.id === payload.eventId);
    const event = state.events.find(event => event.id === payload.eventId);
    delete event.participants[payload.userId];
    state.events.splice(index, 1, event);
  },

  setAvailableDates(state, payload) {
    const event = state.events.find(event => event.id === payload.eventId);
    event.participants[payload.userId].availableDates = payload.dates;
  }
};

const actions = {
  loadAllEvents({ commit }) {
    const eventsRef = firebase.database().ref("events");
    eventsRef.once("value").then(data => {
      const events = [];
      const obj = data.val();
      for (let key in obj) {
        events.push({
          id: key,
          title: obj[key].title,
          location: obj[key].location,
          creatorId: obj[key].creatorId,
          creatorName: obj[key].creatorName,
          createdAt: obj[key].createdAt,
          participants: obj[key].participants,
          suggestedDates: obj[key].suggestedDates
        });
      }
      commit("loadAllEvents", events);
    });
  },

  addEvent({ commit, getters }, payload) {
    // Get Firebase ID for new event
    const newEventKey = firebase
      .database()
      .ref("events")
      .push().key;

    // Setup temporary event data holder
    const tempEvent = {
      id: newEventKey,
      title: payload.title,
      location: payload.location,
      creatorId: payload.creatorId,
      creatorName: payload.creatorName,
      createdAt: payload.createdAt,
      suggestedDates: payload.suggestedDates
    };

    // Add creator to event participants list
    const creatorObj = { id: getters.user.id, username: getters.user.username };
    tempEvent["participants"] = {};
    tempEvent.participants[getters.user.id] = { ...creatorObj };

    // Save event and participant to /events
    firebase
      .database()
      .ref("events")
      .child(newEventKey)
      .update(tempEvent)
      .then(console.log("new event written to database"))
      .then(commit("addEvent", tempEvent));

    // Save event to /user/id/registeredEvents
    firebase
      .database()
      .ref("/users/" + getters.user.id + "/registeredEvents")
      .child(newEventKey)
      .update({
        id: newEventKey,
        title: tempEvent.title,
        location: tempEvent.location
      });
  },

  submitAvailableDates({ commit, getters }, payload) {
    const dates = payload.dates;
    const eventId = payload.event.id;
    const eventTitle = payload.event.title;

    firebase
      .database()
      .ref("events/" + eventId + "/participants/" + getters.user.id)
      .child("availableDates")
      .set(payload.dates)
      .then(
        commit("setAvailableDates", {
          eventId: eventId,
          dates: dates,
          userId: getters.user.id
        })
      );

    firebase
      .database()
      .ref("users/" + getters.user.id + "/registeredEvents/")
      .child(eventId)
      .set({
        id: eventId,
        title: eventTitle,
        availableDates: dates,
        confirmed: true
      })
      .then(
        commit("submitAvailableDates", {
          dates: dates,
          eventId: payload.event.id,
          title: eventTitle
        })
      );
  }
};

const getters = {
  events(state) {
    return state.events;
  },
  event(state) {
    return id => {
      return state.events.find(event => {
        return event.id === id;
      });
    };
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
