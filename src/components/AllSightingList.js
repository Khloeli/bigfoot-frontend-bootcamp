import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";

function AllSightingList() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch(`http://localhost:3000/sightings`)
  //     .then((response) => response.json())
  //     .then((dataArray) => {
  //       setData(dataArray);
  //       console.log(dataArray);
  //     })
  //     .catch((error) => console.error("Error:", error));
  // }, []); // Empty array means this effect runs once on mount

  // Axios automatically parses the response data to JSON format, so there is no need to explicitly call response.json()
  useEffect(() => {
    axios.get(`${BACKEND_URL}`).then((response) => {
      setData(response.data);
    });
    // Only run this effect on component mount
  }, []);

  return (
    <div className="App">
      {data
        ? data.map((item, index) => (
            <Link to={`/sightings/${index}`} key={index}>
              <div>
                {" "}
                Year: {item.YEAR} - Season: {item.SEASON} - State: {item.STATE}
              </div>
            </Link>
          ))
        : "Loading..."}
    </div>
  );
}

export default AllSightingList;
