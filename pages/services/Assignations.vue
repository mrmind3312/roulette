<script setup>
import { ref, onMounted, computed } from 'vue'
import dayjs from 'dayjs';

import { useUsersStore } from '~/stores/users'
import { useAvailabilitiesStore } from '~/stores/users/availabilities'
import { useServicesStore } from '~/stores/services'

const runtimeConfig = useRuntimeConfig();
const usersStore = useUsersStore();
const availabilitiesStore = useAvailabilitiesStore();
const servicesStore = useServicesStore();

const currentWeek = ref(getCurrentWeek())
const initalWeekNumber = getWeekNumber(currentWeek.value)
const weeks = ref([])

const daysOfWeek = runtimeConfig.public.days
const months = runtimeConfig.public.months

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

function hoursOfTheDay(dayIndex) {
  if (!servicesStore.service) {
    return []
  }

  return servicesStore.service.hours.filter(hour => {
    return hour.day == dayIndex
  })
}

const monthLabel = computed(() => {
  return months[currentWeek.value.getMonth()]
})

function getMonthDay(dayOfWeek, weekNumber) {
  const date = dayjs().startOf('year').add(getWeekNumber(currentWeek.value) - 1, 'week').add(dayOfWeek, 'day');
  return date.format('D');
}

function getAvailability(day, hour) {
  const availability = availabilitiesStore.availabilities.find(availability => {
    return availability.catalog_hours_id == hour.id &&
      availability.day == day &&
      availability.week == getWeekNumber(currentWeek.value) &&
      availability.month == currentWeek.value.getMonth() &&
      availability.year == currentWeek.value.getFullYear() &&
      availability.services_id == servicesStore.service.id
  })

  return availability
}

function isAvailable(day, hour) {
  const availability = getAvailability(day, hour)

  return availability ? availability.available : false
}

async function toggleAvailability(day, hour) {
  const availability = getAvailability(day, hour)

  if (availability) {
    availabilitiesStore.availability = availability
  } else {
    availabilitiesStore.availability = {}
  }

  availabilitiesStore.availability.catalog_hours_id = hour.id
  availabilitiesStore.availability.day = day
  availabilitiesStore.availability.week = getWeekNumber(currentWeek.value)
  availabilitiesStore.availability.month = currentWeek.value.getMonth()
  availabilitiesStore.availability.year = currentWeek.value.getFullYear()
  availabilitiesStore.availability.available = !availabilitiesStore.availability.available

  availabilitiesStore.toggleAvailability(usersStore.user.id)
}

onMounted(() => {
  for (let i = -5; i <= 5; i++) {
    const newDate = new Date(currentWeek.value.getTime());
    newDate.setDate(newDate.getDate() + (i * 7));
    weeks.value.push(newDate);
  }

  servicesStore.getServices();
  availabilitiesStore.getAllAvailabilities(usersStore.user.id)
})

</script>
<template>
  <div>
    <header class="flex justify-between items-center py-4">
      <div class="flex items-center space-x-4">
        <label class="block">
          <strong class="text-sm text-gray-600">Servicio:</strong>
          <select v-model="servicesStore.service"
                  class="form-select ml-2">
            <option v-for="service in servicesStore.services"
                    :key="service.name"
                    :value="service">{{ service.name }}</option>
          </select>
        </label>

        <label class="block">
          <strong class="text-sm text-gray-600">Semana:</strong>
          <select v-model="currentWeek"
                  class="form-select ml-2">
            <option v-for="week in weeks"
                    :key="week.getDate()"
                    :value="week">{{ formatWeekLabel(week) }}</option>
          </select>
        </label>
      </div>
      <div class="flex items-center">
        <span class="text-lg font-bold">{{ `${usersStore.user.name} (${usersStore.user.email})` }}</span>
      </div>
    </header>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(day, dayIndex) in daysOfWeek"
           :key="day"
           class="border p-2">
        <div class="font-bold">{{ `${day} ${getMonthDay(dayIndex)} ${monthLabel}` }}</div>
        <div v-for="hour in hoursOfTheDay(dayIndex)"
             :key="`${hour.day}_${day}`"
             class="flex items-center justify-between mb-2">
          <span>{{ `${hour.start_at} - ${hour.end_at}` }}</span>
          <button :disabled="getAvailability(dayIndex, hour)?.users_id != usersStore.user.id"
                  :class="{ 'bg-green-500': isAvailable(dayIndex, hour), 'bg-red-500': !isAvailable(dayIndex, hour) }"
                  @click="toggleAvailability(dayIndex, hour)"
                  class="p-2 rounded">
            <span>{{ getAvailability(dayIndex, hour)?.user }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
