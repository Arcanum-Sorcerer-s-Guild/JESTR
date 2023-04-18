import React, { useState, useEffect, Fragment } from 'react';
import '../App.css';
import Map from '../Map/Map.js';
import Layers from '../Map/Layers/Layers.js';
import TileLayer from '../Map/Layers/TileLayer.js';
import VectorLayer from '../Map/Layers/VectorLayer.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
import { osm, vector, xyz } from '../Map/Wrappers/wrapper.js';
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Controls from '../Map/Controls/Controls.js';
import FullScreenControl from '../Map/Controls/FullScreenControl';
import ZoomControl from '../Map/Controls/ZoomControl.js';
import KML from 'ol/format/KML.js';
import VectorSource from 'ol/source/Vector.js';
import KMLVectorLayer from '../Map/Layers/KMLVectorLayer.js';
import mapIcon from './mapIcon.png';

let styles = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: `${mapIcon}`,
    scale: 0.05,
    color: [191,12,215,100],
  }),
  // text: new Text({
  //   font: "16px sans-serif",
  //   textAlign: "left",
  //   justify: "left",
  //   padding: [5, 5, 5, 5],
  //   offsetX: 75,
  //   text: `point`,
  //   fill: new Fill({
  //     color: [0, 0, 0, 1],
  //   }),
  //   backgroundFill: new Fill({
  //     color:
  //       values.Status === "GREEN"
  //         ? "#00ff00"
  //         : values.Status === "AMBER"
  //         ? "#ffff00"
  //         : values.Status === "RED"
  //         ? "#ff0000"
  //         : values.Status === "NA"
  //         ? "#0000ff"
  //         : [25, 118, 210, 0.6],
  //   }),
  // }),
});

const ReserveMap = ({ assetList, selected, center, setCenter }) => {
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

  useEffect(() => {
    if (selected.length > 0) {
      let combCoord = { lat: 0, lon: 0 };
      let selGeos = geoArray.filter((geo) =>
        selected.includes(geo.properties.name)
      );

      combCoord = selGeos.reduce((acc, curr) => {
        acc.lat += Number(curr.geometry.coordinates[1]);
        acc.lon += Number(curr.geometry.coordinates[0]);
        return acc;
      }, combCoord);

      combCoord.lat /= selGeos.length;
      combCoord.lon /= selGeos.length;

      setCenter([combCoord.lon, combCoord.lat]);
    } else {
      setCenter([-146.44166473513687, 64.31714411488758]);
    }
  }, [selected]);

  return (
    <div className="w-full h-full">
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
              return selected.includes(geoObject.properties.name) ? (
                <Fragment key={`VectorLayer-${index}`}>
                  <VectorLayer
                    source={vector({
                      features: new GeoJSON().readFeatures(geoObject, {
                        featureProjection: get('EPSG:3857'),
                      }),
                    })}
                    style={styles}
                  />
                </Fragment>
              ) : (
                <></>
              );
            })
          ) : (
            <></>
          )}

          <KMLVectorLayer zIndex={1} />
        </Layers>
        <Controls>
          <FullScreenControl />
          <ZoomControl />
        </Controls>
      </Map>
    </div>
  );
};
export default ReserveMap;
