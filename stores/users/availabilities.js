import { defineStore } from 'pinia'
import { apiService } from '~/services/apiService';

export const useAvailabilitiesStore = defineStore('availabilities', {
  state: () => ({
    availability: {
      users_id: null,
      day: 0,
      week: 0,
      month: 0,
      year: 0,
      available: false,
      catalog_hours_id: null
    },
    availabilities: []
  }),

  actions: {
    async getAvailabilities(user_id) {
      try {
        const { data, error } = await apiService.get(`v1/users/${user_id}/availabilities`)
        this.availabilities = data
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        throw new Error(error.message)
      }
    },
    async getAllAvailabilities(user_id) {
      try {
        const { data, error } = await apiService.get(`v1/users/${user_id}/availabilities/all`)
        this.availabilities = data
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        throw new Error(error.message)
      }
    },
    async setAvailability(user_id) {
      try {
        const { data, error } = await apiService.post(`v1/users/${user_id}/availabilities`, this.availability)

        this.availabilities.push(data)
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        throw new Error(error.message)
      }

    },
    async updateAvailability(user_id) {
      try {
        const { data, error } = await apiService.put(`v1/users/${user_id}/availabilities/${this.availability.id}`, this.availability)

        this.availabilities = this.availabilities.map(availability => availability.id === data.id ? data : availability);
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        throw new Error(error.message)
      }
    },
    async toggleAvailability(user_id) {
      if (this.availability.id) {
        await this.updateAvailability(user_id)
      } else {
        await this.setAvailability(user_id)
      }
    },
    async dropAvailability(user_id) {
      try {
        const { data, error } = await apiService.delete(`v1/users/${user_id}/availabilities/${this.availability.id}`)
        console.log(data)

        this.availabilities = this.availabilities.filter(availability => availability.id !== id)
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        throw new Error(error.message)
      }
    }
  }
})
