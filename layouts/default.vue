<script setup>
import { useUsersStore } from '~/stores/users'
import { useAvailabilitiesStore } from '~/stores/users/availabilities'
import { useServicesStore } from '~/stores/services'

const usersStore = useUsersStore();
const availabilitiesStore = useAvailabilitiesStore();
const servicesStore = useServicesStore();

const handleLogout = async () => {
  availabilitiesStore.availabilities = []
  servicesStore.services = []
  await usersStore.logout();
  location.href = '/'
}

</script>
<template>
  <div>
    <nav class="flex justify-between items-center py-4">
      <div class="flex items-center">
        <nuxt-link to="/"
                   class="text-lg font-bold">Logo Here</nuxt-link>
      </div>
      <div class="flex items-center">
        <ul class="flex">
          <li class="mr-6">
            <nuxt-link to="/users/availabilities"
                       class="text-gray-600 hover:text-gray-900">Availabilities</nuxt-link>
          </li>
          <li class="mr-6">
            <nuxt-link to="/services/assignations"
                       class="text-gray-600 hover:text-gray-900">Assignations</nuxt-link>
          </li>
          <li class="mr-6"
              v-if="usersStore.user">
            <button @click="handleLogout"
                    class="text-gray-600 hover:text-gray-900">Logout</button>
          </li>
        </ul>
      </div>
    </nav>

    <slot />
  </div>
</template>
