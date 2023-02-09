import React, { useEffect, useRef, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { useStyles } from './app.styles';
import theme from './theme';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN || '';

export const App = () => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <styled.map ref={mapContainer} />
    </ThemeProvider>
  )
}