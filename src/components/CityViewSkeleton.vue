<template>
  <div class="flex flex-col flex-1">
    <!-- Overview -->
    <div class="flex flex-col items-center py-12">
      <Skeleton class="max-w-[300px] w-full mb-2"/>
      <Skeleton class="max-w-[300px] w-full mb-12"/>
      <Skeleton class="max-w-[300px] h-[100px] w-full mb-2"/>
      <Skeleton class="max-w-[300px] w-full mb-8"/>
      <Skeleton class="max-w-[300px] h-[75px] w-full "/>
    </div>

    <!-- hourly -->
    <div class="flex flex-col py-6 items-center">
      <Skeleton class="max-w-screen-md h-[100px] w-full mb-12"/>
    </div>

    <!-- weekly -->
    <div class="flex flex-col py-6 items-center">
      <Skeleton class="max-w-screen-md h-[100px] w-full mb-12"/>
    </div>
    <div class="flex flex-col py-6 items-center">
      <Skeleton class="max-w-[50px] h-[20px] w-full mb-12"/>
    </div>
  </div>
</template>

<script setup>
import Skeleton from "../components/Skeleton.vue";
</script>
