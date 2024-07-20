import { defineStore } from 'pinia'
import { apiService } from '~/services/apiService';

export const useHoursStore = defineStore('hours', {
  state: () => ({
    hour: null,
    hours: []
  }),

  actions: {
    async getHours() {
      try {
        const { data, error } = await apiService.get('v1/catalog/hours')
        this.hours = data.value;
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        throw new Error(error.message)
      }
    }
  }
})
