<script setup>
import { ref, defineProps, watch, computed } from 'vue'
import { useUsersStore } from '~/stores/users'
import { useAvailabilitiesStore } from '~/stores/users/availabilities'

const usersStore = useUsersStore();
const availabilitiesStore = useAvailabilitiesStore();

const props = defineProps({
  hour: {
    default: () => { return {} }
  },
  day: {
    default: 0
  },
  availability: {
    default: null
  },
  currentWeek: {
    default: () => {
      return new Date()
    }
  }
})

const isAvailable = computed(() => {
  if (props.availability) {
    return props.availability.available;
  }
  return false;
})

function getWeekNumber(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date - startOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)

}

const toggleAvailability = async () => {
  const availability = props.availability
  console.log("🚀 ~ toggleAvailability ~ availability:", availability)
  

  if (availability) {
    availabilitiesStore.availability = availability
  } else {
    availabilitiesStore.availability = {}
  }

  availabilitiesStore.availability.catalog_hours_id = props.hour.id
  availabilitiesStore.availability.day = props.day
  availabilitiesStore.availability.week = getWeekNumber(props.currentWeek)
  availabilitiesStore.availability.month = props.currentWeek.getMonth()
  availabilitiesStore.availability.year = props.currentWeek.getFullYear()
  availabilitiesStore.availability.available = !availabilitiesStore.availability.available

  if (!availabilitiesStore.availability.available) {
    availabilitiesStore.availability.services_id = null
  }

  await availabilitiesStore.toggleAvailability(usersStore.user.id)
}

</script>
<template>
  <div class="flex items-center justify-between mb-2">
    <span>{{ `${hour.start_at} - ${hour.end_at}` }}</span>
    <button :class="{ 'bg-green-500': isAvailable, 'bg-red-500': !isAvailable }"
            @click="toggleAvailability"
            class="p-2 rounded">
      {{ isAvailable ? 'Available' : 'Not Available' }}
    </button>
  </div>
</template>
