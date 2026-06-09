import React from 'react';

export const PixelCloud = ({ size = 80, className = '' }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 20 12" className={className} shapeRendering="crispEdges">
    {[[4,2],[5,2],[11,2],[12,2],[13,2],[3,3],[6,3],[10,3],[14,3],[2,4],[7,4],[9,4],[15,4],[1,5],[8,5],[16,5],
      [1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[15,6],[16,6],
      [2,7],[16,7]].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="1" height="1" fill="currentColor" />
    ))}
  </svg>
);

export const PixelStar = ({ size = 18, className = '', color = '#FFD93D' }) => (
  <svg width={size} height={size} viewBox="0 0 9 9" className={className} shapeRendering="crispEdges">
    {[[4,0],[4,1],[3,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],
      [1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[2,5],[3,5],[4,5],[5,5],[6,5],
      [2,6],[3,6],[5,6],[6,6],[1,7],[2,7],[6,7],[7,7]].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="1" height="1" fill={color} />
    ))}
  </svg>
);

export const PixelFlower = ({ size = 18, className = '', color = '#F85D7F', center = '#FFD93D' }) => (
  <svg width={size} height={size} viewBox="0 0 7 7" className={className} shapeRendering="crispEdges">
    {[[3,0],[2,1],[3,1],[4,1],[3,2]].map(([x, y], i) => (
      <rect key={`t${i}`} x={x} y={y} width="1" height="1" fill={color} />
    ))}
    {[[0,3],[1,3],[5,3],[6,3],[1,4],[5,4]].map(([x, y], i) => (
      <rect key={`s${i}`} x={x} y={y} width="1" height="1" fill={color} />
    ))}
    {[[3,4],[2,5],[3,5],[4,5],[3,6]].map(([x, y], i) => (
      <rect key={`b${i}`} x={x} y={y} width="1" height="1" fill={color} />
    ))}
    <rect x="3" y="3" width="1" height="1" fill={center} />
  </svg>
);

export const PixelHeart = ({ size = 18, className = '', color = '#F85D7F' }) => (
  <svg width={size} height={size} viewBox="0 0 7 6" className={className} shapeRendering="crispEdges">
    {[[1,0],[2,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],
      [1,2],[2,2],[3,2],[4,2],[5,2],[2,3],[3,3],[4,3],[3,4]].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="1" height="1" fill={color} />
    ))}
  </svg>
);

export const PixelArrow = ({ size = 14, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 7 7" className={className} shapeRendering="crispEdges">
    {[[4,1],[5,1],[1,2],[2,2],[3,2],[4,2],[5,2],[1,3],[5,3],[1,4],[5,4],[1,5],[2,5],[3,5],[4,5],[5,5]].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="1" height="1" fill={color} />
    ))}
  </svg>
);

export const PixelSparkle = ({ size = 14, className = '', color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 5 5" className={className} shapeRendering="crispEdges">
    {[[2,0],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[4,2],[1,3],[2,3],[3,3],[2,4]].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="1" height="1" fill={color} />
    ))}
  </svg>
);
