import React, { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocationData } from "../apis/location.api";
import { InputForm } from "../components/input";
import { ILocationResDto } from "../types/location.type";
import { LocationData } from "../components/locationData";

export type TContext = {
  getLocData: ILocationResDto | null;
  locationSubmitHandler: (value: string) => void;
};

export const Context = createContext<TContext>({
  getLocData: null,
  locationSubmitHandler: () => {},
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

  const locationSubmitHandler = (value: string) => {
    setLocation(value);
  };

  console.log("loc", location);
  console.log("Location data", getLocData.data);

  return (
    <Context.Provider
      value={{
        getLocData: getLocData.data || null,
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
