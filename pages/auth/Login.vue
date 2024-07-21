<script setup>
import { ref } from 'vue'
import { useUsersStore } from '~/stores/users'

const email = ref('')
const password = ref('')
const isEmailEmpty = ref(false)
const isPasswordEmpty = ref(false)

const usersStore = useUsersStore()

const handleLogin = async () => {
  if (!email.value) {
    isEmailEmpty.value = true
    return;
  }

  if (!password.value) {
    isPasswordEmpty.value = true
    return;
  }

  await usersStore.login(email.value, password.value)

  console.log("🚀 ~ handleLogin ~ usersStore.user:", usersStore.user)

  await navigateTo('/users/availabilities')
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
                 for="username">
            E-mail
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 :class="isEmailEmpty ? 'border border-red-500' : ''"
                 id="username"
                 type="text"
                 placeholder="example@google.com"
                 v-model="email" />
          <p v-show="isEmailEmpty"
             class="text-red-500 text-xs italic">Please enter an E-mail.</p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2"
                 for="password">
            Password
          </label>
          <input class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                 :class="isPasswordEmpty ? 'border border-red-500' : ''"
                 id="password"
                 type="password"
                 placeholder="*********"
                 v-model="password" />
          <p v-show="isPasswordEmpty"
             class="text-red-500 text-xs italic">Please enter a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button @click="handleLogin"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button">
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
