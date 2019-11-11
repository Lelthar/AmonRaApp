import React from 'react';
import { ViroPolyline, ViroMaterials } from 'react-viro';

const singlePixelTransparentPNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==';

const ISSUE_512_MATERIAL = 'ISSUE(#512)';

ViroMaterials.createMaterials({
  [ISSUE_512_MATERIAL]: {
    diffuseTexture: { uri: singlePixelTransparentPNG },
  },
});

export default function VRHeadset() {
  // all values here are as low as they can be without the workaround polyline being culled
  return (
    <ViroPolyline
      ignoreEventHandling={false}
      materials={[ISSUE_512_MATERIAL]}
      opacity={0.1}
      points={[[0, 0, 0]]}
      // slightly offset the X and Y so that it doesn't interfere with our cursor
      position={[1, 1, -20]}
      scale={[0.01, 0.01, 0.01]}
      thickness={0.1}
    />
  );
}