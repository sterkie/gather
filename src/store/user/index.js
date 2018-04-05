import * as firebase from "firebase";

const state = {
  user: null
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  registerUserForEvent(state, payload) {
    state.user.registeredEvents = {
      ...state.user.registeredEvents,
      [payload.id]: { title: payload.title, id: payload.id }
    };
  },
  unregisterUserForEvent(state, payload) {
    delete state.user.registeredEvents[payload.id];
  }
};

const actions = {
  registerUser({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const tempUser = {
          id: user.uid,
          username: payload.username,
          registeredEvents: {}
        };
        firebase
          .database()
          .ref("users")
          .child(user.uid)
          .update(tempUser);
        commit("setUser", tempUser);
      });
  },

  logOut({ commit }) {
    firebase.auth().signOut();
    commit("setUser", null);
  },

  logInUser({ commit }, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const tempUser = {
          id: user.uid,
          username: "",
          registeredEvents: {}
        };
        commit("setUser", tempUser);
      })
      .catch(err => console.log(err));
  },

  autoLogIn({ commit }, payload) {
    const tempUser = {
      id: payload.uid,
      username: "",
      registeredEvents: []
    };
    commit("setUser", tempUser);
  },

  getUserData({ commit, getters }) {
    const userId = getters.user.id;
    const userRef = firebase.database().ref("users/" + userId);
    userRef.once("value").then(data => {
      const tempUser = {
        id: userId,
        username: data.val().username,
        registeredEvents: data.val().registeredEvents
      };
      commit("setUser", tempUser);
    });
  },

  registerUserForEvent({ commit, getters }, payload) {
    let registeredEvents = {};
    if (getters.user.registeredEvents === undefined) {
      registeredEvents = {
        [payload.id]: { title: payload.title, id: payload.id }
      };
    } else {
      registeredEvents = {
        ...getters.user.registeredEvents,
        [payload.id]: { title: payload.title, id: payload.id }
      };
    }
    // add event to users/id/registeredEvents
    firebase
      .database()
      .ref("/users/" + getters.user.id)
      .child("registeredEvents")
      .update(registeredEvents)
      .catch(e => console.log(e))
      .then(commit("registerUserForEvent", payload))
      .catch(e => console.log(e));
    // add user to events/id/participants
    let participants = {};
    if (payload.participants === undefined) {
      participants = {
        [getters.user.id]: {
          username: getters.user.username,
          id: getters.user.id
        }
      };
    } else {
      participants = {
        ...payload.participants,
        [getters.user.id]: {
          username: getters.user.username,
          id: getters.user.id
        }
      };
    }

    firebase
      .database()
      .ref("events/" + payload.id)
      .child("participants")
      .update(participants)
      .then(
        commit("addParticipant", {
          eventId: payload.id,
          userId: getters.user.id,
          userName: getters.user.username
        })
      )
      .catch(e => console.log(e));
  },

  unregisterUserForEvent({ commit, getters }, payload) {
    firebase
      .database()
      .ref("users/" + getters.user.id)
      .child("registeredEvents/" + payload.id)
      .remove()
      .then(commit("unregisterUserForEvent", payload))
      .catch(e => console.log(e));
    firebase
      .database()
      .ref("events/" + payload.id + "/participants/" + getters.user.id)
      .remove()
      .then(
        commit("removeParticipant", {
          userId: getters.user.id,
          eventId: payload.id
        })
      )
      .catch(e => console.log(e));
  }
};

const getters = {
  user(state) {
    return state.user;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
