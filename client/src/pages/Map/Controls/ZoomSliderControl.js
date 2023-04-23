import React, { useContext, useEffect, useState } from 'react';
import { ZoomSlider } from 'ol/control';
import MapContext from '../MapContext';

const ZoomSliderControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let zoomSlider = new ZoomSlider({});
    map.controls.push(zoomSlider);

    return () => map.controls.remove(zoomSlider);
  }, [map]);
  return null;
};

export default ZoomSliderControl;
