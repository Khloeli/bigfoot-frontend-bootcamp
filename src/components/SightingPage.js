import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";

function SightingPage() {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/${sightingIndex}`).then((response) => {
      setSighting(response.data);
      console.log(response.data);
    });
  }, [sightingIndex]);

  // Get the sightingIndex param from the URL. update index
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  return (
    <div className="App">
      {" "}
      <div>
        {sighting &&
          Object.entries(sighting).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
      </div>
      <br />
      <Link to={`/`}>Back to All Sightings</Link>
    </div>
  );
}

export default SightingPage;
