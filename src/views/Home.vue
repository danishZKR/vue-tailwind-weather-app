<template>
  <main class="container text-white">
    <!-- Search Section -->
    <div class="pt-4 mb-8">
      <input
        type="text"
        placeholder="Search for City or Province"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-md dark:focus:border-gray-600"
        v-model="searchQuery"
        @input="getSearchResult"
      />
      <ul
        v-if="searchResult"
        class="bg-weather-secondary shadow-md py-2 px-1 mt-4 rounded dark:bg-gray-800"
      >
        <p v-if="searchError">Sorry something went wrong try again!</p>
        <p v-if="!searchError && searchResult.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            class="py-2 cursor-pointer"
            v-for="palce in searchResult"
            :key="palce.palce_id"
            @click="goToPreview(palce)"
          >
            {{ palce.display_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityListSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityListSkeleton from "../components/CityListSkeleton.vue";

const searchQuery = ref("");
const searchResult = ref(null);
const queryTimeOut = ref(null);
const searchError = ref(false);

const getSearchResult = () => {
  clearTimeout(queryTimeOut.value);
  queryTimeOut.value = setTimeout(async () => {
    try {
      if (searchQuery.value !== "") {
        const result = await axios.get(
          `https://geocode.maps.co/search?q={${searchQuery.value}`
        );
        searchResult.value = result.data.slice(0, 5);
        return;
      }
    } catch (error) {
      searchError.value = true;
    }
    searchResult.value = null;
  }, 200);
};

const router = useRouter();

const goToPreview = (palce) => {
  const [city, province] = palce.display_name.split(",");
  router.push({
    name: "city",
    params: {
      city: city,
      province: province,
    },
    query: {
      lat: palce.lat,
      lon: palce.lon,
      preview: true,
    },
  });
};
</script>
