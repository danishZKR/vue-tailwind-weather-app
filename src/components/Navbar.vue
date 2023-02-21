<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg  dark:bg-gray-800">
    <nav class="container flex flex-col sm:flex-row text-white items-center py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex justify-center gap-3">
          <span class="text-2xl">
            <i class="fa-solid fa-sun"></i>
          </span>
          <p class="text-2xl">The Local Wehater</p>
        </div>
      </RouterLink>
      <div class="flex flex-1 justify-end gap-3">
        <input
          class="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          @input="toggleDark()"
        />
        <span class="text-xl cursor-pointer hover:text-blue-300" @click="openModal">
          <i class="fa-solid fa-circle-info"></i>
        </span>
        <span
          v-show="route.query.preview"
          class="text-xl cursor-pointer"
          @click="addCity"
        >
          <i class="fa-solid fa-plus"></i>
        </span>
      </div>
      <BaseModal :showModal="showModal" @close-button="closeModal">
        <div class="text-black  dark:text-white">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The local weather alows you to track the current and future weather of the
            city of you choosing!
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>Search for your city by entering the name into the srearch bar.</li>
            <li>
              Select a city within the results. this will take you to the current weather
              of the your selection.
            </li>
            <li>
              Track the city by clicking on the + icon in the top right. this will save
              the city to view at a later time on the home page.
            </li>
          </ol>
          <h2 class="text-2xl">Removing a city:</h2>
          <p class="mb-4">
            if you no longar wish to track a city. simply select the city within the home
            page. At the bottom of the page there will an option to delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "../components/BaseModal.vue";
import { uid } from "uid";
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const showModal = ref(false);

const openModal = () => {
  showModal.value = !showModal.value;
};
const closeModal = () => {
  showModal.value = !showModal.value;
};

const savedCities = ref([]);

const route = useRoute();
const router = useRouter();

const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }
  const locationObj = {
    id: uid(),
    province: route.params.province,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);

  delete query.preview;

  query.id = locationObj.id;

  router.replace({ query });
};
</script>
