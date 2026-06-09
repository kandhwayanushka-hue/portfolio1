export const PixelStar = ({ size = 24, color = "#FF3B30", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" className={className} aria-hidden="true">
    <g fill={color}>
      <rect x="5" y="0" width="2" height="2" />
      <rect x="5" y="10" width="2" height="2" />
      <rect x="0" y="5" width="2" height="2" />
      <rect x="10" y="5" width="2" height="2" />
      <rect x="3" y="3" width="2" height="2" />
      <rect x="7" y="3" width="2" height="2" />
      <rect x="3" y="7" width="2" height="2" />
      <rect x="7" y="7" width="2" height="2" />
      <rect x="5" y="5" width="2" height="2" />
    </g>
  </svg>
);

export const PixelHeart = ({ size = 24, color = "#FF66B2", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" className={className} aria-hidden="true">
    <g fill={color}>
      <rect x="1" y="2" width="2" height="2" />
      <rect x="3" y="1" width="2" height="2" />
      <rect x="7" y="1" width="2" height="2" />
      <rect x="9" y="2" width="2" height="2" />
      <rect x="0" y="3" width="2" height="3" />
      <rect x="10" y="3" width="2" height="3" />
      <rect x="2" y="5" width="8" height="2" />
      <rect x="3" y="7" width="6" height="1" />
      <rect x="4" y="8" width="4" height="1" />
      <rect x="5" y="9" width="2" height="1" />
    </g>
  </svg>
);

export const PixelArrow = ({ size = 18, color = "#0A0A0A", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" className={className} aria-hidden="true">
    <g fill={color}>
      <rect x="1" y="5" width="7" height="2" />
      <rect x="6" y="3" width="2" height="2" />
      <rect x="8" y="5" width="2" height="2" />
      <rect x="6" y="7" width="2" height="2" />
    </g>
  </svg>
);
