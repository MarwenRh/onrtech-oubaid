import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../../../assets/icons8-google-maps (1).svg";
import { useTranslation } from "react-i18next";

import { Icon } from "leaflet";

// Define marker type
interface MarkerProps {
  geoCode: [number, number];
  popUp: string;
}

const Map: React.FC = () => {
  const { t } = useTranslation();

  // Define markers
  const markers: MarkerProps = {
    geoCode: [48.820999003398, 2.546667020091],
    popUp: "visit us here",
  };

  // Create a Leaflet icon instance
  const myIcon: Icon = L.icon({
    iconUrl: iconUrl,
    iconSize: [38, 38],
  });

  return (
    <div className="mt-8 mx-auto h-96 w-4/5   md:w-3/5 md:h-96 flex flex-col ">
      <div className="map-intro text-center mb-8">
        <h2 className="text-slate-500 text-2xl font-bold mb-2">
          {t("discover")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-200">
          {t("map_descrp")}
        </p>
      </div>

      <MapContainer
        center={markers.geoCode}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "35px" }}
      >
        <TileLayer
          attribution=""
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Use customIcon for Marker */}
        <Marker position={markers.geoCode} icon={myIcon}>
          <Popup>
            <h4>{markers.popUp}</h4>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
