import React, { useContext } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Context } from "../pages/main";

export type TMap = {
  lat: number;
  lng: number;
};

export const MapLocation: React.FC<TMap> = ({ lat, lng }) => {
  const position: LatLngExpression = [lat, lng];

  const { locationSubmitHandler, setLocation } = useContext(Context);

  const OnMapClickHandler = () => {
    useMapEvents({
      click: (event) => {
        console.log(event.latlng);
        const { lat, lng } = event.latlng;
        console.log(`${lat}, ${lng}`);

        locationSubmitHandler(`${lat}%2C${lng}`);
        setLocation(`${lat}%2C${lng}`);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={4}
      className="!w-[280px] !h-[300px] sm:!w-[500px] !rounded-md !shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>hiii</Popup>
      </Marker>
      <OnMapClickHandler />
    </MapContainer>
  );
};
