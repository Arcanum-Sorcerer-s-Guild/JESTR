import KML from 'ol/format/KML.js'
import {useContext, useEffect} from 'react';
import MapContext from './MapContext';
import VectorSource from 'ol/source/Vector.js'
import { Vector } from 'ol/layer.js'
// import VectorSource from 'ol/source/Vector.js'




const KMLVectorLayer = ({zIndex = 0}) => {
  const {map} = useContext(MapContext)
  useEffect(()=> {
    if (!map) return;
    let vectorLayer = new Vector({
      url: './airspace.kml',
      format: new KML()
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