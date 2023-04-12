import React, {useState} from 'react'
import '../App.css';
import Map from './Map.js'
import Layers from './Layers.js';
import TileLayer from './TileLayer.js';
import VectorLayer from './VectorLayer.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style'
import {osm, vector, xyz} from './wrapper.js'
import {fromLonLat, get} from 'ol/proj'
import GeoJSON from 'ol/format/GeoJSON'
import Controls from './Controls.js'
import FullScreenControl from './FullScreenControl'
import KML from 'ol/format/KML.js';
import VectorSource from 'ol/source/Vector.js'
import KMLVectorLayer from './KMLVectorLayer.js'

let styles = {
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0,0,255,0.1)',
    }),
  }),
};

// const kmlVector = new VectorLayer({
// 	source: new VectorSource({
// 		url: './KMLs/airspace.kml',
// 		format: new KML(),
// 	})
// })

const geojsonObject = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {
				"kind": "county",
				"name": "Wyandotte",
				"state": "KS"
			},
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": [
					[
						[
							[
								-94.8627,
								39.202
							],
							[
								-94.901,
								39.202
							],
							[
								-94.9065,
								38.9884
							],
							[
								-94.8682,
								39.0596
							],
							[
								-94.6053,
								39.0432
							],
							[
								-94.6053,
								39.1144
							],
							[
								-94.5998,
								39.1582
							],
							[
								-94.7422,
								39.1691
							],
							[
								-94.7751,
								39.202
							],
							[
								-94.8627,
								39.202
							]
						]
					]
				]
			}
		}
	]
};
const geojsonObject2 = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {
				"kind": "county",
				"name": "Johnson",
				"state": "KS"
			},
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": [
					[
						[
							[
								-94.9065,
								38.9884
							],
							[
								-95.0544,
								38.9829
							],
							[
								-95.0544,
								38.7365
							],
							[
								-94.9668,
								38.7365
							],
							[
								-94.6108,
								38.7365
							],
							[
								-94.6108,
								38.846
							],
							[
								-94.6053,
								39.0432
							],
							[
								-94.8682,
								39.0596
							],
							[
								-94.9065,
								38.9884
							]
						]
					]
				]
			}
		}
	]
};

const MapExample = () => {
  const [center, setCenter] = useState([-146.44166473513687, 64.31714411488758]);
  const [zoom, setZoom] = useState(8);

return (
  <div>
    <Map center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer
          source={xyz({url:"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}
          zIndex={0}
        />
				<KMLVectorLayer zIndex={0}/>


      </Layers>
      <Controls>
        <FullScreenControl />
      </Controls>
    </Map>
		</div>
  );
}
export default MapExample;



// const [showLayer1, setShowLayer1] = useState(true);
// const [showLayer2, setShowLayer2] = useState(true);


{/* 
        {showLayer1 && (
          <VectorLayer
            source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
            style={styles.MultiPolygon}
          />
        )}
        {showLayer2 && (
          <VectorLayer
            source={vector({ features: new  GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
            style={styles.MultiPolygon}
          />
        )} */}


{/* <div>
      <input
        type="checkbox"
        checked={showLayer1}
        onChange={event => setShowLayer1(event.target.checked)}
      /> Johnson County
    </div>
    <div>
      <input
        type="checkbox"
        checked={showLayer2}
        onChange={event => setShowLayer2(event.target.checked)}
      /> Wyandotte County</div>
    </div> */}