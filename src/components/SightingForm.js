import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SightingForm() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // send date, location, notes to backend
    axios
      .post(`${BACKEND_URL}/sightings`, {
        date,
        location,
        notes,
      })
      .then((res) => {
        //reset form
        setDate("");
        setLocation("");
        setNotes("");
      })
      .then(() => navigate(`/`));
  };

  const handleBack = () => {
    navigate(`/`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, Country"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Bear spotted"
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
      <Button onClick={handleBack}>Back</Button>
    </Form>
  );
}

export default SightingForm;
