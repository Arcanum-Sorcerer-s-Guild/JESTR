import React, { useContext, useEffect, useState } from 'react';
import { Zoom } from 'ol/control';
import MapContext from '../MapContext';

const ZoomControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let zoom = new Zoom({});
    map.controls.push(zoom);

    return () => map.controls.remove(zoom);
  }, [map]);
  return null;
};

export default ZoomControl;
