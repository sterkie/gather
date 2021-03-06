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
          participants: obj[key].participants
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
      createdAt: payload.createdAt
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
