import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

export type TMap = {
  lat: number;
  lng: number;
};

export const MapLocation: React.FC<TMap> = ({ lat, lng }) => {
  const position: LatLngExpression = [lat, lng];

  return (
    <MapContainer center={position} zoom={4} className="!w-[280px] !h-[300px] sm:!w-[500px] !rounded-md !shadow-lg">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>hiii</Popup>
      </Marker>
    </MapContainer>
  );
};
