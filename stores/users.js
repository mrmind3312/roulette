import { defineStore } from 'pinia'
import { apiService, setToken } from '~/services/apiService';

export const useUsersStore = defineStore('users', {
  state: () => ({
    user: null,
    availabilities: []
  }),

  actions: {
    async login(email, password) {
      try {
        const { data, error } = await apiService.post('auth/login', { user: { email, password } })
        this.user = data;
        this.getAvailabilities();
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        throw new Error('Invalid credentials')
      }
    },

    async getAvailabilities() {
      try {
        const { data, error } = await apiService.get(`v1/users/${this.user.id}/availabilities`)
        this.availabilities = data
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        throw new Error('Invalid credentials')
      }
    },

    async logout() {
      this.user = null
      this.availabilities = []
    }
  }
})