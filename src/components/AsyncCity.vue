<template>
  <div class="flex flex-col flex-1 items-center text-white">
    <!-- Banner -->
    <div v-show="route.query.preview" class="p-4 bg-weather-secondary w-full text-center  dark:bg-gray-700">
      <p>
        Your are currently previewing this city, click the + icon to start tracking this
        city.
      </p>
    </div>
    <!-- Overview -->
    <div class="flex flex-col items-center py-12">
      <h1 class="text-4xl mb-2">
        {{ route.params.city }}
      </h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(((weatherData.current.temp - 32) * 5) / 9) }}&deg;
      </p>
      <p>
        Feels like
        {{ Math.round(((weatherData.current.feels_like - 32) * 5) / 9) }}&deg;
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>
    <hr class="border-white border-opacity-10 border w-full" />
    <!-- hourly -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8">
        <p class="text-md mb-2">Hourly Weather</p>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourly in weatherData.hourly"
            :key="hourly.dt"
            class="flex flex-col dap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourly.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`"
              al
            />
            <p class="text-xl">{{ Math.round(((hourly.temp - 32) * 5) / 9) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- weekly -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8">
        <p class="text-md mb-2">7 Day Forcast</p>
        <div v-for="daily in weatherData.daily" class="flex items-center">
          <p class="flex-1">
            {{
              new Date(daily.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(((daily.temp.max - 32) * 5) / 9) }}&deg;</p>
            <p>L: {{ Math.round(((daily.temp.min - 32) * 5) / 9) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
    <button
      class="flex items-center gap-2 py-12 duration-150 hover:text-red-500 cursor-pointer"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      Remove City
    </button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

const { lat, lon } = route.query;
const weatherAPIKey = import.meta.env.VITE_APP_Weather_Key;

const getWeatherData = async () => {
  try {
    const weatherDataResult = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${weatherAPIKey}&units=imperial`
    );
    // cal current date & time
    const localOffSet = new Date().getTimezoneOffset() * 60000;
    const utc = weatherDataResult.data.current.dt * 1000 + localOffSet;
    weatherDataResult.data.currentTime =
      utc + 1000 * weatherDataResult.data.timezone_offset;

    // cal hourly weather offset
    weatherDataResult.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffSet;
      hour.currentTime = utc + 1000 * weatherDataResult.data.timezone_offset;
    });
    // flicker delay
    await new Promise((res) => setTimeout(res, 1000));
    return weatherDataResult.data;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();

const savedCities = ref([]);

const router = useRouter();

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  savedCities.value = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  router.push({
    name: "home",
  });
};
</script>
