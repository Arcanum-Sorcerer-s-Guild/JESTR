import KML from 'ol/format/KML.js'
import {useContext, useEffect} from 'react';
import MapContext from '../MapContext';
import VectorSource from 'ol/source/Vector.js'
import OLVectorLayer from 'ol/layer/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/layer.js'


const KMLVectorLayer = ({source, style, zIndex = 0}) => {
  const {map} = useContext(MapContext)
  useEffect(()=> {
    if (!map) return;

    let vectorLayer = new VectorLayer({
        source: new VectorSource({
          url: 'http://localhost:3000/airspace.kml',
          format: new KML(),
        })
    })

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(vectorLayer)
      }
    }
  }, [map])
  return null;
}

export default KMLVectorLayer;
