import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { ListGroup, Form, Button } from "react-bootstrap";

function SightingPage() {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings/${sightingIndex}`).then((response) => {
      setSighting(response.data);
    });
    axios
      .get(`${BACKEND_URL}/sightings/${sightingIndex}/comments`)
      .then((response) => {
        setComments(response.data);
      });
  }, [sightingIndex, newComment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // send date, location, notes to backend
    axios
      .post(`${BACKEND_URL}/sightings/${sightingIndex}/comments`, {
        content: newComment,
      })
      .then(() => {
        setNewComment("");
      });
  };

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
        <ListGroup.Item active>COMMENTS</ListGroup.Item>{" "}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-3 d-flex">
            <Form.Control
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Insert new comment"
            />
            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
        {comments &&
          comments.map((comment, index) => (
            <ListGroup.Item key={index}>{comment.content}</ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

export default SightingPage;
