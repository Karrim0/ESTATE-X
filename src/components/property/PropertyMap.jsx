import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const PropertyMap = ({ properties, selectedLocation }) => {
  const createCustomIcon = (price) => {
    return L.divIcon({
      html: `
        <div class="relative">
          <div class="bg-white text-gray-900 font-bold px-3 py-1.5 rounded-xl shadow-lg border-2 border-blue-500 text-sm hover:scale-110 hover:z-50 transition-transform duration-200 whitespace-nowrap flex justify-center items-center">
            ${price}
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r-2 border-b-2 border-blue-500"></div>
        </div>
      `,
      className: "custom-marker-icon",
      iconSize: [null, null],
      iconAnchor: [20, 40],
    });
  };

  const defaultCenter =
    properties.length > 0 ? properties[0].coordinates : [34.0736, -118.4004];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap"
      />

      {selectedLocation && <ChangeView center={selectedLocation} zoom={15} />}

      {properties.map((property) => (
        <Marker
          key={property.id}
          position={property.coordinates}
          icon={createCustomIcon(`$${(property.price / 1000).toFixed(0)}k`)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-sm">{property.title}</h3>
              <p className="text-xs text-gray-600">{property.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PropertyMap;
