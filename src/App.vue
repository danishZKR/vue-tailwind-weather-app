<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary dark:bg-gray-600">
    <Navbar />
    <RouterView v-slot="{Component}">
      <Transition>
        <component :is="Component" name="page" mode="out-in"/> 
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<style>
.page-enter-active,
.page-leave-active{
   transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to{
   opacity: 0;
}

</style>