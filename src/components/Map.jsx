import React from 'react'
// import { Map as LeafletMap } from "react-leaflet/LeafletMap";
import { TileLayer } from "react-leaflet/TileLayer";
import './Map.css'
import { MapContainer } from 'react-leaflet/MapContainer'
import { showDataOnMap } from '../util'
//import { useMap } from 'react-leaflet/hooks'

function Map({countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer  center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer >
    </div>
  );
}

export default Map;
