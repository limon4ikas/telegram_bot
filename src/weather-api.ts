import ky from "ky";
import { z } from "zod";

import { env } from "./env.js";

export async function getTodayWeather(cityName: string = "Helsinki") {
  const url = new URL("http://api.weatherapi.com/v1/forecast.json");

  url.searchParams.set("key", env.WEATHER_API_TOKEN);
  url.searchParams.set("q", cityName);
  url.searchParams.set("days", "1");
  url.searchParams.set("aqi", "no");
  url.searchParams.set("alerts", "no");

  const result = await ky.get(url).json();

  return WeatherSchema.parse(result);
}

const WeatherSchema = z.object({
  location: z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    tz_id: z.string(),
    localtime_epoch: z.number(),
    localtime: z.string(),
  }),
  current: z.object({
    last_updated_epoch: z.number(),
    last_updated: z.string(),
    temp_c: z.number(),
    temp_f: z.number(),
    is_day: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
      code: z.number(),
    }),
    wind_mph: z.number(),
    wind_kph: z.number(),
    wind_degree: z.number(),
    wind_dir: z.string(),
    pressure_mb: z.number(),
    pressure_in: z.number(),
    precip_mm: z.number(),
    precip_in: z.number(),
    humidity: z.number(),
    cloud: z.number(),
    feelslike_c: z.number(),
    feelslike_f: z.number(),
    vis_km: z.number(),
    vis_miles: z.number(),
    uv: z.number(),
    gust_mph: z.number(),
    gust_kph: z.number(),
  }),
  forecast: z.object({
    forecastday: z.array(
      z.object({
        date: z.string(),
        date_epoch: z.number(),
        day: z.object({
          maxtemp_c: z.number(),
          maxtemp_f: z.number(),
          mintemp_c: z.number(),
          mintemp_f: z.number(),
          avgtemp_c: z.number(),
          avgtemp_f: z.number(),
          maxwind_mph: z.number(),
          maxwind_kph: z.number(),
          totalprecip_mm: z.number(),
          totalprecip_in: z.number(),
          totalsnow_cm: z.number(),
          avgvis_km: z.number(),
          avgvis_miles: z.number(),
          avghumidity: z.number(),
          daily_will_it_rain: z.number(),
          daily_chance_of_rain: z.number(),
          daily_will_it_snow: z.number(),
          daily_chance_of_snow: z.number(),
          condition: z.object({
            text: z.string(),
            icon: z.string(),
            code: z.number(),
          }),
          uv: z.number(),
        }),
        astro: z.object({
          sunrise: z.string(),
          sunset: z.string(),
          moonrise: z.string(),
          moonset: z.string(),
          moon_phase: z.string(),
          moon_illumination: z.string(),
          is_moon_up: z.number(),
          is_sun_up: z.number(),
        }),
        hour: z.array(
          z.object({
            time_epoch: z.number(),
            time: z.string(),
            temp_c: z.number(),
            temp_f: z.number(),
            is_day: z.number(),
            condition: z.object({
              text: z.string(),
              icon: z.string(),
              code: z.number(),
            }),
            wind_mph: z.number(),
            wind_kph: z.number(),
            wind_degree: z.number(),
            wind_dir: z.string(),
            pressure_mb: z.number(),
            pressure_in: z.number(),
            precip_mm: z.number(),
            precip_in: z.number(),
            humidity: z.number(),
            cloud: z.number(),
            feelslike_c: z.number(),
            feelslike_f: z.number(),
            windchill_c: z.number(),
            windchill_f: z.number(),
            heatindex_c: z.number(),
            heatindex_f: z.number(),
            dewpoint_c: z.number(),
            dewpoint_f: z.number(),
            will_it_rain: z.number(),
            chance_of_rain: z.number(),
            will_it_snow: z.number(),
            chance_of_snow: z.number(),
            vis_km: z.number(),
            vis_miles: z.number(),
            gust_mph: z.number(),
            gust_kph: z.number(),
            uv: z.number(),
          })
        ),
      })
    ),
  }),
});
