import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { LatLng, Icon } from "leaflet";

const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function UserLocation() {
  const [pos, setPos] = useState<LatLng | null>(null);

  useMapEvents({
    locationfound(e) {
      setPos(e.latlng);
    }
  });

  return pos ? <Marker position={pos} icon={defaultIcon} /> : null;
}
