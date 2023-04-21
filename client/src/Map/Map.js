import React, { useRef, useState, useEffect } from 'react';
import './Map.css';
import MapContext from './MapContext';
import * as ol from 'ol';

const Map = ({ children, zoom, center, style }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({
        zoom,
        center,
        maxZoom: 18,
      }),
      layers: [],
      controls: [],
      overlays: [],
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);
  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);
  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
    // console.log(map.getView().fit())

    // map.getView().fit(featuresLayer.getSource().getExtent(), {
    //   padding: [100, 100, 100, 100],
    // });
  }, [center]);
  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="w-fit h-fit" style={style}>
        {children}
      </div>
    </MapContext.Provider>
  );
};
export default Map;
