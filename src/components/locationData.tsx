import React, { useContext } from "react";
import { ILocationResDto } from "../types/location.type";
import { Context } from "../pages/main";
import { WeatherData } from "./weatherData";
import { MapLocation } from "./mapLocation";

export const LocationData: React.FC<ILocationResDto> = () => {
  const { getLocData, isLoading } = useContext(Context);

  const result = getLocData?.results?.[0];

  const regions = result?.annotations.UN_M49.regions;

  const countryCode = result?.components.country_code;
  const flagUrl = `https://flagcdn.com/144x108/${countryCode?.toLowerCase()}.png`;

  const lat = getLocData?.results?.[0].geometry.lat;
  const lng = getLocData?.results?.[0].geometry.lng;

  if (!isLoading && getLocData && !getLocData?.results?.length) {
    return (
      <div className="flex justify-center mt-10 font-medium">
        No data available...
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 flex justify-center gap-6 md:gap-10 items-center flex-col md:flex-row">
        {getLocData?.results && getLocData.results.length && (
          <div className="bg-gray-50 p-6 shadow-md rounded-xl lg:w-1/3 xl:w-[29%] mx-3 sm:mx-0">
            <h2 className="text-2xl font-medium text-gray-700">
              {result?.formatted}
            </h2>
            <div className="flex gap-2 mt-5 items-end">
              <h3 className="font-medium text-gray-800">City Name:</h3>
              <h3 className="font-medium text-teal-600 text-sm ">
                {result?.components.city
                  ? `${result?.components.city}`
                  : "Not Found"}
              </h3>
            </div>
            <div className="flex gap-2 mt-4 items-end">
              <h3 className="font-medium text-gray-800">Country:</h3>
              <h3 className="font-medium text-teal-600 text-sm">
                {result?.components.country || "Not Found"}
              </h3>
            </div>
            <div className="flex gap-2 mt-4 items-start sm:item-end">
              <h3 className="font-medium text-gray-800">Region:</h3>
              <h3 className="font-medium text-teal-600 text-sm">
                {Object.entries(regions || {})
                  .slice(0, 3)
                  .map(([key], index, array) => (
                    <span key={key}>{`${key} ${
                      index < array.length - 1 ? ", " : " "
                    } `}</span>
                  ))}
              </h3>
            </div>
            <div className="flex gap-2 mt-4 items-end">
              <h3 className="font-medium text-gray-800">Continent:</h3>
              <h3 className="font-medium text-teal-600 text-sm">
                {result?.components.continent || "Not Found"}
              </h3>
            </div>
            <div className="flex gap-2 mt-4 items-end">
              <h3 className="font-medium text-gray-800">Currency:</h3>
              <h3 className="font-medium text-teal-600 text-sm">
                {`${result?.annotations.currency.symbol || "Not Found"}, ${
                  result?.annotations.currency.name || "Not Found"
                }`}
              </h3>
            </div>
            <div className="flex gap-2 mt-4 items-end">
              <h3 className="font-medium text-gray-800">Time Zone:</h3>
              <h3 className="font-medium text-teal-600 text-sm">
                {`${result?.annotations.timezone.name || "Not Found"} ${
                  result?.annotations.timezone.offset_string || "Not Found"
                }`}
              </h3>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6 justify-center items-center">
          {result?.annotations.callingcode && (
            <div className="shadow-lg rounded-lg overflow-hidden w-40">
              <div className="bg-gray-800 text-white p-4 text-center text-lg font-medium">
                Calling Code
              </div>
              <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-white p-5 text-center font-bold text-lg">
                +{result.annotations.callingcode}
              </div>
            </div>
          )}

          {result?.annotations.flag && (
            <div>
              <img src={flagUrl} alt={`${result?.components.country} flag`} />
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 flex gap-6 lg:gap-10 mb-6 justify-center items-center flex-col md:flex-row px-5 lg:px-0">
        {lat && lng && <MapLocation lat={lat} lng={lng} />}
        <WeatherData />
      </div>
    </>
  );
};
