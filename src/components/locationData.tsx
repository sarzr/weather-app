import React, { useContext } from "react";
import { ILocationResDto } from "../types/location.type";
import { Context } from "../pages/main";
import { WeatherData } from "./weatherData";

export const LocationData: React.FC<ILocationResDto> = () => {
  const { getLocData, isLoading } = useContext(Context);

  const result = getLocData?.results?.[0];

  const regions = result?.annotations.UN_M49.regions;

  const countryCode = result?.components.country_code;
  const flagUrl = `https://flagcdn.com/144x108/${countryCode?.toLowerCase()}.png`;

  if (!isLoading && getLocData && !getLocData?.results?.length) {
    console.log(isLoading);

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
              <h3 className="font-medium text-blue-700 text-sm ">
                {result?.components.city
                  ? `${result?.components.city}`
                  : "Not Found"}
              </h3>
            </div>
            <div className="flex gap-2 mt-4 items-end">
              <h3 className="font-medium text-gray-800">Country:</h3>
              <h3 className="font-medium text-blue-700 text-sm">
                {result?.components.country || "Not Found"}
              </h3>
            </div>
            <div className="flex gap-2 mt-4 items-start sm:item-end">
              <h3 className="font-medium text-gray-800">Region:</h3>
              <h3 className="font-medium text-blue-700 text-sm">
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
              <h3 className="font-medium text-blue-700 text-sm">
                {result?.components.continent || "Not Found"}
              </h3>
            </div>
            <div className="flex gap-2 mt-4 items-end">
              <h3 className="font-medium text-gray-800">Currency:</h3>
              <h3 className="font-medium text-blue-700 text-sm">
                {`${result?.annotations.currency.symbol || "Not Found"}, ${
                  result?.annotations.currency.name || "Not Found"
                }`}
              </h3>
            </div>
            <div className="flex gap-2 mt-4 items-end">
              <h3 className="font-medium text-gray-800">Time Zone:</h3>
              <h3 className="font-medium text-blue-700 text-sm">
                {`${result?.annotations.timezone.name || "Not Found"} ${
                  result?.annotations.timezone.offset_string || "Not Found"
                }`}
              </h3>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6">
          {result?.annotations.callingcode && (
            <div>
              <div className="bg-gray-900 text-white h-fit p-5 rounded-t-lg text-center">
                Calling Code
              </div>
              <div className="bg-yellow-500 text-gray-50 p-5 rounded-b-lg text-center">
                {result.annotations.callingcode}
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
      <div className="mt-10">
        <WeatherData />
      </div>
    </>
  );
};
