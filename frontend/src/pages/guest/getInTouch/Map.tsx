import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../../../assets/icons8-google-maps (1).svg";
import { useTranslation } from "react-i18next";
import { MdLocationOn } from "react-icons/md";
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
    <div className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Map Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
            <MdLocationOn className="w-4 h-4 mr-2" />
            Find Us
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("discover")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("map_descrp")}
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="h-96 lg:h-[500px]">
            <MapContainer
              center={markers.geoCode}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={markers.geoCode} icon={myIcon}>
                <Popup className="custom-popup">
                  <div className="p-2">
                    <h4 className="font-semibold text-gray-900 mb-2">{markers.popUp}</h4>
                    <p className="text-sm text-gray-600">Villiers Sur Marne, France</p>
                    <p className="text-sm text-gray-600">Paris Region</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Location Details */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
              <MdLocationOn className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Our Location
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Villiers Sur Marne<br />
              Paris Region, France
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Business Hours
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monday - Friday<br />
              9:00 AM - 6:00 PM CET
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              +33 7 50 21 83 96<br />
              contact@onrtech.fr
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
