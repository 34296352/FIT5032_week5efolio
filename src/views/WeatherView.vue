<template>
  <div class="container" style="max-width:720px">
    <div class="header" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin:20px 0">
      <h1 style="margin:0">WEATHER APP</h1>

      <div class="search-bar" style="display:flex;gap:8px;flex:1;justify-content:flex-end">
        <input
          type="text"
          v-model.trim="city"
          placeholder="Enter city name (e.g. Clayton,AU)"
          class="search-input"
          style="flex:0 1 260px;padding:8px 10px;border:1px solid #ccc;border-radius:8px"
          @keyup.enter="searchByCity"
        />
        <button
          @click="searchByCity"
          class="search-button"
          style="padding:8px 14px;border-radius:8px;border:1px solid #0d6efd;background:#0d6efd;color:#fff"
        >
          Search
        </button>
      </div>
    </div>

    <main>
      
      <div v-if="loading" style="padding:12px" aria-live="polite">Loading...</div>

      
      <div v-if="error" style="padding:12px;color:#b00020">{{ error }}</div>

      
      <div v-if="weatherData" style="padding:16px;border:1px solid #eee;border-radius:12px">
        <h2 style="margin-top:0">
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div style="display:flex;align-items:center;gap:16px">
          <img :src="iconUrl" alt="Weather Icon" width="80" height="80" />
          <p style="font-size:28px;margin:0">{{ temperature }} °C</p>
        </div>
        <span style="text-transform:capitalize">{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";


const apikey =
  import.meta.env?.VITE_OPENWEATHER_KEY ||
  "083d5b073352533ea749fc361289336d";


const BASE = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&units=metric`;

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      loading: false,
      error: null,
    };
  },
  computed: {
 
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null;
    },
   
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async searchByCity() {
      const q = this.city?.trim();
      if (!q) return;
      const url = `${BASE}&q=${encodeURIComponent(q)}`;
      await this.fetchWeatherData(url);
    },

    async fetchCurrentLocationWeather() {
      if (!navigator.geolocation) return; 
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const url = `${BASE}&lat=${coords.latitude}&lon=${coords.longitude}`;
          await this.fetchWeatherData(url);
        },
        () => {} 
      );
    },

    async fetchWeatherData(url) {
      try {
        this.loading = true;
        this.error = null;
        
        console.log("Requesting:", url);
        const { data } = await axios.get(url, { timeout: 15000 });
        this.weatherData = data;
      } catch (e) {
        this.weatherData = null;
        const status = e?.response?.status;
        const apiMsg = e?.response?.data?.message;

        if (status === 401) this.error = "Invalid API key. Check your key/activation.";
        else if (status === 404) this.error = "City not found. Try 'Clayton,AU'.";
        else if (status === 429) this.error = "Too many requests. Try again later.";
        else this.error = apiMsg ? `Failed: ${apiMsg}` : "Failed to fetch weather data.";

        console.error("Error fetching weather data:", e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.search-button:focus,
.search-input:focus {
  outline: 2px solid #0d6efd55;
  outline-offset: 2px;
}
</style>
