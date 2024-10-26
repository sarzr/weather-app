import React, { createContext } from "react";
import { getWeatherData } from "../apis/weather.api";
import { useQuery } from "@tanstack/react-query";
import { getLocationData } from "../apis/location.api";
import { InputForm } from "../components/input";
import { IWeatherResDto } from "../types/weather.type";
import { ILocationResDto } from "../types/location.type";
import { LocationData } from "../components/locationData";

export type TContext = {
  getWeaData: IWeatherResDto | null;
  getLocData: ILocationResDto | null;
  locationSubmitHandler: (value: string) => void;
  isLoading: boolean;
};

export const Context = createContext<TContext>({
  getLocData: null,
  getWeaData: null,
  locationSubmitHandler: () => {},
  isLoading: false
});

export const Main: React.FC = () => {
  const [location, setLocation] = React.useState<string>("");

  const getLocData = useQuery({
    queryKey: ["get-location-data", location],
    queryFn: () =>
      getLocationData({
        q: location,
        key: "dfc65ad4d2004225af6322975e91f312",
      }),
    enabled: !!location,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  console.log(getLocData);

  const getWeaData = useQuery({
    queryKey: ["get-weather-data", getLocData.data],
    queryFn: () => {
      const lat = getLocData.data?.results?.[0].geometry.lat;
      const lng = getLocData.data?.results?.[0].geometry.lng;

      return getWeatherData({
        lat: Number(lat),
        lng: Number(lng),
        appid: "936c3de28f2f239db4412a5897a259bf",
      });
    },
    enabled: !!getLocData.data,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const locationSubmitHandler = (value: string) => {
    setLocation(value);
  };

  console.log("loc", location);
  console.log("Location data", getLocData.data);
  console.log("Weather data", getWeaData.data);

  return (
    <Context.Provider
      value={{
        getWeaData: getWeaData.data || null,
        getLocData: getLocData.data || null,
        isLoading: getLocData.isLoading,
        locationSubmitHandler: locationSubmitHandler,
      }}
    >
      <div className="bg-gray-200 min-h-screen pt-10 pb-10 flex flex-col">
        <InputForm />
        <LocationData />
      </div>
    </Context.Provider>
  );
};
