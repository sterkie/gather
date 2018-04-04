import * as firebase from "firebase";

const state = {
  user: null
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
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
    const registeredEvents = {
      ...(getters.user.registeredEvents || {}),
      [payload.id]: payload
    };

    // add event to users/id/registeredEvents
    firebase
      .database()
      .ref("/users/" + getters.user.id)
      .child("registeredEvents")
      .update(registeredEvents)
      .then(console.log("added to registeredEvents"))
      .catch(e => console.log(e));
    // add user to events/id/participants
    firebase
      .database()
      .ref("events/" + payload.id)
      .child("participants")
      .update({
        ...payload.participants,
        [getters.user.id]: {
          username: getters.user.username,
          id: getters.user.id
        }
      })
      .then(console.log("added to participants"))
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
