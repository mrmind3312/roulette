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
        </ul>
      </div>
    </nav>
    
    <slot />
  </div>
</template>
