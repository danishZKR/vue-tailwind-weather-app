<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer  dark:bg-gray-700">
    <div class="flex flex-col flex-1 gap-2">
       <Skeleton class="max-w-[50%]"/>
       <Skeleton class="max-w-[40%]"/>
    </div>
    <div class="flex flex-col items-end flex-1 gap-2">
        <Skeleton class="max-w-[50%] w-full"/>
       <Skeleton class="max-w-[75%] w-full"/>
    </div>
  </div>
</template>

<script setup>
import Skeleton from './Skeleton.vue';
</script>
