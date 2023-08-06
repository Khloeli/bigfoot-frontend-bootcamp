import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
// import { ListGroup } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

function SightingPage() {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings/${sightingIndex}`).then((response) => {
      setSighting(response.data);
      console.log(response.data);
    });
    axios
      .get(`${BACKEND_URL}/sightings/${sightingIndex}/comments`)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      });
  }, [sightingIndex]);

  // Get the sightingIndex param from the URL. update index
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  return (
    <div>
      {sighting && (
        <div>
          <div>Date: {sighting.date}</div>
          <div>Location:{sighting.location}</div>
          <div>Notes:{sighting.notes}</div>
        </div>
      )}
      <br />
      <Link to={`/`}>Back to All Sightings</Link>
      <br />
      <br />

      <Link to={`/sightings/${sightingIndex}/edit`}>Edit Sighting</Link>
      <br />
      <br />
      <ListGroup>
        <ListGroup.Item active>COMMENTS</ListGroup.Item>
        {comments &&
          comments.map((comment, index) => (
            <ListGroup.Item key={index}>{comment.content}</ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

export default SightingPage;
