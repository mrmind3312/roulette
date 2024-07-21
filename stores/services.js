import { defineStore } from 'pinia'
import { apiService } from '~/services/apiService';

export const useServicesStore = defineStore('services', {
  state: () => ({
    service: null,
    services: []
  }),

  actions: {
    async getServices() {
      try {
        const { data, error } = await apiService.get('v1/services')
        this.services = data;
        this.service = this.services[0];
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error)
        throw new Error(error.message)
      }
    }
  }
})
