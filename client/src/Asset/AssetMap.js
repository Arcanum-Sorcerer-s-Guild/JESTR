import React, { useState, useEffect } from 'react';
import '../App.css';
import Map from '../Map/Map.js';
import Layers from '../Map/Layers/Layers.js';
import TileLayer from '../Map/Layers/TileLayer.js';
import VectorLayer from '../Map/Layers/VectorLayer.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector, xyz } from '../Map/Wrappers/wrapper.js';
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Controls from '../Map/Controls/Controls.js';
import FullScreenControl from '../Map/Controls/FullScreenControl';
import ZoomControl from '../Map/Controls/ZoomControl.js';
import KML from 'ol/format/KML.js';
import VectorSource from 'ol/source/Vector.js';
import KMLVectorLayer from '../Map/Layers/KMLVectorLayer.js';
import { json } from 'react-router-dom';

let styles = {
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0,0,255,0.1)',
    }),
  }),
};

const AssetMap = ({ currAsset, style }) => {
  const [zoom, setZoom] = useState(10);
  const [selAsset, setSelAsset] = useState([]);
  const [geoObj, setGeoObj] = useState({});
  const [center, setCenter] = useState([]);

  useEffect(() => {
    setSelAsset(currAsset);
    setCenter(fromLonLat([currAsset.Longitude, currAsset.Latitude]));
  }, [currAsset]);


  useEffect(() => {
    //center={[currAsset.Longitude, currAsset.Latitude]}
    setGeoObj(
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [selAsset.Longitude, selAsset.Latitude],
        },
        properties: {
          name: selAsset.serial,
        },
      })


  }, [selAsset]);





  return (<>

    {Object.keys(geoObj).length > 0 ?
      <div className="w-full h-full">

        {center}
        <Map center={center} zoom={zoom} style={style}>
          <Layers>
            <TileLayer
              source={xyz({
                url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
              })}
            />

            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geoObj, {
                  featureProjection: get('EPSG:3857'),
                }),
              })}
            />

            <KMLVectorLayer zIndex={99} />
          </Layers>
          <Controls>
            <FullScreenControl />
            <ZoomControl />
          </Controls>
        </Map>
      </div>
      : <></>}

  </>);
};
export default AssetMap;
