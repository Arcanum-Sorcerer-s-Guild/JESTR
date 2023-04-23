import { useContext, useEffect } from 'react';
import MapContext from '../MapContext';
import OLVectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector.js'

const VectorLayer = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let vectorLayer = new OLVectorLayer({
      source,
      style,
    });
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
    //Fuck this little shit....
  }, [map, source]);
  return null;
};

export default VectorLayer;
