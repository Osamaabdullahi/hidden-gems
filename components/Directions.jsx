"use client";

import React, { useState, useEffect } from "react";
import { Map, ZoomControl } from "pigeon-maps";
import { regions } from "../data";

function PointsOfInterest({ longitude, latitude }) {
  const [city, setCity] = useState(regions.find((x) => x.name === "Barcelona"));

  return (
    <div className="w-full h-full">
      <Map key={longitude} defaultCenter={[-1.2641, 36.8034]} defaultZoom={13}>
        <ZoomControl />
      </Map>
    </div>
  );
}
export default PointsOfInterest;
