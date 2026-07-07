import { useState } from 'react';
import { Card, Button, Input } from '@medicycle/ui';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation2, Search } from 'lucide-react';

// Quick fix for leaflet marker icons in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const mockPharmacies = [
  { id: 1, name: 'City Health Pharmacy', lat: 51.505, lng: -0.09, distance: '2.4 km', stock: 15 },
  { id: 2, name: 'Green Cross', lat: 51.51, lng: -0.1, distance: '6.0 km', stock: 4 },
  { id: 3, name: 'MediCare Hub', lat: 51.515, lng: -0.09, distance: '12 km', stock: 0 },
];

export default function Nearby() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Nearby Pharmacies & Sellers
        </h1>
        <p className="text-white/60 mt-1">Find unexpired medicines available for local pickup.</p>
      </div>

      <div className="flex gap-4 mb-6">
        <Button variant="primary" className="rounded-full">All Distances</Button>
        <Button variant="ghost" className="rounded-full bg-white/5 border border-white/5">2 km</Button>
        <Button variant="ghost" className="rounded-full bg-white/5 border border-white/5">5 km</Button>
        <Button variant="ghost" className="rounded-full bg-white/5 border border-white/5">10 km</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Sidebar List */}
        <div className="col-span-1 flex flex-col gap-4 overflow-y-auto pr-2">
          {mockPharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} glass className="p-5 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{pharmacy.name}</h3>
                <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
                  {pharmacy.distance}
                </span>
              </div>
              <p className="text-sm text-white/60 flex items-center gap-1 mb-4">
                <MapPin className="w-3 h-3" /> View on map
              </p>
              
              <div className="flex items-center justify-between mt-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${pharmacy.stock > 0 ? 'bg-success/20 text-success' : 'bg-red-500/20 text-red-400'}`}>
                  {pharmacy.stock > 0 ? `${pharmacy.stock} medicines available` : 'Out of stock'}
                </span>
                <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Navigation2 className="w-4 h-4 mr-1" /> Directions
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Map */}
        <Card glass className="col-span-1 lg:col-span-2 p-1 overflow-hidden relative">
          <div className="absolute top-4 left-4 right-4 z-[1000] max-w-sm">
            <div className="relative shadow-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input placeholder="Search location..." className="pl-10 bg-surface/90 backdrop-blur-md border-white/20" />
            </div>
          </div>
          <MapContainer 
            center={[51.505, -0.09]} 
            zoom={13} 
            className="w-full h-full rounded-lg z-0"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mockPharmacies.map(pharmacy => (
              <Marker key={pharmacy.id} position={[pharmacy.lat, pharmacy.lng]}>
                <Popup className="rounded-xl">
                  <div className="p-2 font-sans">
                    <strong className="block mb-1 text-surface">{pharmacy.name}</strong>
                    <span className="text-gray-600 text-sm">{pharmacy.distance} away</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Card>
      </div>
    </div>
  );
}
