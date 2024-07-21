<script setup>
import { ref, onMounted } from 'vue'
import { useUsersStore } from '~/stores/users'
import { useHoursStore } from '~/stores/hours'
import { useAvailabilitiesStore } from '~/stores/users/availabilities'

const runtimeConfig = useRuntimeConfig();
const usersStore = useUsersStore();
const hoursStore = useHoursStore();
const availabilitiesStore = useAvailabilitiesStore();

const currentWeek = ref(getCurrentWeek())
const initalWeekNumber = getWeekNumber(currentWeek.value)

const daysOfWeek = runtimeConfig.public.days

function getCurrentWeek() {
  const today = new Date()
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
  return firstDayOfWeek
}

function formatWeekLabel(date) {
  const weekNumber = getWeekNumber(date)
  return `Semana ${weekNumber}-${date.getFullYear()}`
}

function getWeekNumber(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date - startOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)

}

function nextWeek() {
  currentWeek.value = new Date(currentWeek.value.setDate(currentWeek.value.getDate() + 7))
}

function previousWeek() {
  if (initalWeekNumber != getWeekNumber(currentWeek.value)) {
    currentWeek.value = new Date(currentWeek.value.setDate(currentWeek.value.getDate() - 7))
  }
}

function getAvailability(day, hour) {
  const availability = availabilitiesStore.availabilities.find(availability => {
    return availability.catalog_hours_id == hour.id && availability.day == day &&
      availability.week == getWeekNumber(currentWeek.value) &&
      availability.month == currentWeek.value.getMonth() &&
      availability.year == currentWeek.value.getFullYear()
  })

  return availability
}

onMounted(() => {
  hoursStore.getHours()
  availabilitiesStore.getAvailabilities(usersStore.user.id)
})

</script>
<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between mb-4">
      <strong>{{ formatWeekLabel(currentWeek) }}</strong>
      <button @click="nextWeek"
              class="btn">Siguiente Semana</button>
      <button @click="previousWeek"
              class="btn">Semana Anterior</button>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(day, dayIndex) in daysOfWeek"
           :key="day"
           class="border p-2">
        <div class="font-bold">{{ day }}</div>
        <AvailabilityRow v-for="hour in hoursStore.hours"
                         :key="`${day}_${hour.id}`"
                         :hour="hour"
                         :day="dayIndex"
                         :availability="getAvailability(dayIndex, hour)"
                         :current-week="currentWeek" />
      </div>
    </div>
  </div>
</template>
<style>
.btn {
  @apply bg-blue-500 text-white px-4 py-2 rounded;
}
</style>
