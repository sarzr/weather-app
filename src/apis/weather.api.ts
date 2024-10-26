import { IWeatherReqDto, IWeatherResDto } from "../types/weather.type";
import { weatherUrl } from "./client";
import { urls } from "./urls";

type getWeatherDataType = (_: IWeatherReqDto) => Promise<IWeatherResDto>;
export const getWeatherData: getWeatherDataType = async (params) => {
  const client = weatherUrl();
  const response = await client.get(urls.weather, {
    params: {
      lat: params.lat,
      lon: params.lng,
      appid: params.appid,
    },
  });
  console.log(response);
  return response.data;
};
