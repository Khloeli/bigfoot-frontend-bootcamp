import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

function EditSightingForm() {
  // const [sightingIndex, setSightingIndex] = useState();
  // const [sighting, setSighting] = useState();
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  // const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState(null);
  const navigate = useNavigate();

  const params = useParams();
  let sightingIndex = params.sightingIndex;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings/${sightingIndex}`)
      .then((response) => {
        setSighting(response.data);
        // console.log(response.data);
      })
      .catch((error) =>
        console.error("Error fetching sighting details:", error)
      );
  }, [sightingIndex]);

  useEffect(() => {
    if (sighting) {
      // Convert the ISO date format to the "yyyy-MM-ddThh:mm" format expected by datetime-local input
      const formattedDate = sighting.date.slice(0, 16); // Extract the date and time without seconds and milliseconds
      setDate(formattedDate);
      setLocation(sighting.location);
      setNotes(sighting.notes);
    }
  }, [sighting]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // send date, location, notes to backend
    axios
      .put(`${BACKEND_URL}/sightings/${sightingIndex}`, {
        date,
        location,
        notes,
      })
      .then((res) => {
        //reset form
        setDate("");
        setLocation("");
        setNotes("");
      });
    navigate(`/`);
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
      <Button type="submit">Update</Button>
      <Button onClick={handleBack}>Back</Button>
    </Form>
  );
}

export default EditSightingForm;
