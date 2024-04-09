import React, { SetStateAction } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

type MapProps = {
  position: [number, number];
  setPosition?: React.Dispatch<SetStateAction<[number, number]>>;
};

const SiteLocation: React.FC<MapProps> = ({ position, setPosition }) => {
  const handleMapClick = (lat: number, lng: number) => {
    setPosition && setPosition([lat, lng]);
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {setPosition && <MapEvents onMapClick={handleMapClick} />}
      <Marker position={position}>
        {position && (
          <Marker position={position}>
            <Popup>Selected Location</Popup>
          </Marker>
        )}
      </Marker>
    </MapContainer>
  );
};

const MapEvents: React.FC<{
  onMapClick: (lat: number, lng: number) => void;
}> = ({ onMapClick }) => {
  const map = useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
    locationfound(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null; // This component does not render anything
};

export default SiteLocation;
