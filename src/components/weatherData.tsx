import React, { useContext } from "react";
import { Context } from "../pages/main";
import { IWeatherResDto } from "../types/weather.type";

export const WeatherData: React.FC<IWeatherResDto> = () => {
  const { getWeaData } = useContext(Context);

  const weatherIcon = getWeaData?.weather?.[0].icon;

  const weatherUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <div className="flex justify-center items-center">
      {getWeaData && (
        <div className="bg-gray-50 p-6 shadow-md rounded-xl w-72 sm:w-80 flex justify-center flex-col items-center">
          {getWeaData?.weather && (
            <h2 className="text-xl font-medium text-gray-700">
              WEATHER REPORT
            </h2>
          )}
          {getWeaData?.weather && (
            <>
              <img src={weatherUrl} alt="weather icon" />
              <h3 className="font-semibold text-lg text-teal-600">
                {getWeaData?.weather?.[0].description}
              </h3>
            </>
          )}

          <div className="flex gap-2 mt-9 items-end">
            <h3 className="font-medium text-gray-800">Wind Speed:</h3>
            <h3 className="font-medium text-teal-600 text-sm">
              {getWeaData?.wind?.speed ? getWeaData?.wind?.speed : "Not Found"}
            </h3>
          </div>
          <div className="flex gap-2 mt-5 items-end">
            <h3 className="font-medium text-gray-800">Temperature:</h3>
            <h3 className="font-medium text-teal-600 text-sm">
              {getWeaData?.main?.temp
                ? `${getWeaData?.main?.temp}F`
                : "Not Found"}
            </h3>
          </div>
          <div className="flex gap-2 mt-5 items-end">
            <h3 className="font-medium text-gray-800">Humidity:</h3>
            <h3 className="font-medium text-teal-600 text-sm">
              {getWeaData?.main?.humidity
                ? `${getWeaData?.main?.humidity}%`
                : "Not Found"}
            </h3>
          </div>
          <div className="flex gap-2 mt-5 items-end">
            <h3 className="font-medium text-gray-800">Visibility:</h3>
            <h3 className="font-medium text-teal-600 text-sm">
              {getWeaData?.visibility
                ? `${getWeaData?.visibility}m`
                : "Not Found"}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};
