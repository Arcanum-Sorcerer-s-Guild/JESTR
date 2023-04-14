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
import KML from 'ol/format/KML.js';
import VectorSource from 'ol/source/Vector.js';
import KMLVectorLayer from '../Map/Layers/KMLVectorLayer.js';

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

const ReserveMap = ({ assetList }) => {
  // let {assetList} = props
  const [center, setCenter] = useState([
    -146.44166473513687, 64.31714411488758,
  ]);
  const [zoom, setZoom] = useState(8);
  const [geoArray, setGeoArray] = useState([]);
  const [selectedAssets] = useState([]);

  useEffect(() => {
    setGeoArray(
      assetList.map((asset) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [asset.Longitude, asset.Latitude],
          },
          properties: {
            name: asset.Serial,
          },
        };
      })
    );
  }, [assetList]);

  const handleChange = (assetName, assetCoordinates) => {
    if (selectedAssets.includes(assetName)) {
      const index = selectedAssets.indexOf(assetName);
      selectedAssets.splice(index, 1);
    } else {
      selectedAssets.push(assetName);
      // setZoom(10);
      setCenter(assetCoordinates);
    }
  };

  useEffect(() => {
    if (geoArray.length > 0) {
      geoArray.map((asset, index) =>
        handleChange(asset.properties.name, asset.geometry.coordinates)
      );
    }
  }, [geoArray]);

  return (
    <div>
      {/* {console.log(Map)} */}
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer
            source={xyz({
              url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            })}
            // zIndex={-1}
          />

          {geoArray.length > 0 ? (
            geoArray.map((geoObject, index) => {
              return selectedAssets.includes(geoObject.properties.name) ? (
                <>
                  <VectorLayer
                    source={vector({
                      features: new GeoJSON().readFeatures(geoObject, {
                        featureProjection: get('EPSG:3857'),
                      }),
                    })}
                  />
                </>
              ) : (
                <></>
              );
            })
          ) : (
            <></>
          )}

          <KMLVectorLayer zIndex={99} />
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
};
export default ReserveMap;
