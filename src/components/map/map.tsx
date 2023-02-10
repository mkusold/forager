import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { useStyles } from './map.styles';
import { MAP_SETTINGS } from './map.const';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN || '';

export const Map = () => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  const [lng, setLng] = useState(MAP_SETTINGS.default.lon);
  const [lat, setLat] = useState(MAP_SETTINGS.default.lat);
  const [zoom, setZoom] = useState(MAP_SETTINGS.default.zoom);

  const styled= useStyles();
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });
    
  return (
      <styled.map ref={mapContainer} />
  )
}