import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";

function AllSightingList() {
  const [data, setData] = useState(null);

  // Axios automatically parses the response data to JSON format, so there is no need to explicitly call response.json()
  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setData(response.data);
      // console.log(response.data);
    });
  }, [data]);

  return (
    <div className="App">
      <Link to="/sightings/new">Record New Sighting</Link>
      <br />
      <br />
      {data
        ? data.map((item) => (
            <Link to={`/sightings/${item.id}`} key={item.id}>
              <div>
                {" "}
                {item.date.split("T")[0]} ~ {item.location}
              </div>
            </Link>
          ))
        : "Loading..."}
    </div>
  );
}

export default AllSightingList;
