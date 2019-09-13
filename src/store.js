import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: null,
      email: null,
      photo: null
    },
    users: [],
    positions: [],
    token: null
  },
  mutations: {
    loadUser(state, data) {
      state.user = data
    },
    loadUsers(state, data) {
      data.forEach(user => {
        state.users.push(user)
      })
    },
    async getToken(state) {
      try {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
        const data = await response.json();
        state.token = data.token
      } catch(err) {
        console.log(err)
      }
    },
    loadPositions(state, data) {
      state.positions = data
    },
    clearUsers(state) {
      state.users = []
    }
  },
  actions: {
    async fetchUser({commit}) {
      try {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users/1');
        const data = await response.json();
        commit('loadUser', data.user)
      } catch(err) {
        console.log(err)
      }
    },
    async fetchUsers({commit}, {page, btn}) {
      try {
        const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
        const data = await response.json();
        if (data.success) {
          const users = data.users.sort((a, b) => {
            return new Date(b.registration_timestamp) - new Date(a.registration_timestamp);
          });
          commit('loadUsers', users)
        } else {
          btn.classList.add('users__btn--off')
        }
      } catch(err) {
        console.log(err)
      }
    },
    async fetchPositions({commit}) {
      try {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
        const data = await response.json();
        commit('loadPositions', data.positions)
      } catch(err) {
        console.log(err)
      }
    },
    async postUser({state}, { position, name, email, phone, photo }) {
      let formData = new FormData();
      formData.append('position_id', position);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('photo', photo);
      try {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
          method: 'POST',
          body: formData,
          headers: {
            'Token': state.token
          }
        });
        const data = await response.json();
        console.log(data)
      } catch(err) {
        console.log(err)
      }
    }
  }
})