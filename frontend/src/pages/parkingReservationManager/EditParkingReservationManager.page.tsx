import React, { useEffect, useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PATH_DASHBOARD } from "../../routes/paths";

// Types for reservations, parking spots, and statuses
type ParkingReservation = {
  id: string;
  spotId: string;
  vehicleNumber: string;
  startTime: string;
  endTime: string;
  status: string;
};

type ParkingSpot = {
  id: string;
  location: string;
  isAvailable: boolean;
};

const statuses = [
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const EditParkingReservationManager: React.FC = () => {
  const [reservation, setReservation] = useState<Partial<ParkingReservation>>({
    spotId: "",
    vehicleNumber: "",
    startTime: "",
    endTime: "",
    status: "",
  });

  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch reservation by ID
  const getReservationById = async () => {
    try {
      const response = await axios.get<ParkingReservation>(
        `https://localhost:7024/api/ParkingReservation/${id}`
      );
      const formattedStartTime = response.data.startTime
        ? response.data.startTime.slice(0, 16)
        : "";
      const formattedEndTime = response.data.endTime
        ? response.data.endTime.slice(0, 16)
        : "";
      setReservation({ ...response.data, startTime: formattedStartTime, endTime: formattedEndTime });
    } catch (error) {
      console.error("Error fetching reservation:", error);
    }
  };

  // Fetch parking spots
  const fetchParkingSpots = async () => {
    try {
      const response = await axios.get<ParkingSpot[]>(
        "https://localhost:7024/api/ParkingSpot/Get"
      );
      setParkingSpots(response.data);
    } catch (error) {
      console.error("Error fetching parking spots:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getReservationById();
      fetchParkingSpots();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = event.target;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  // Save reservation
  const handleSave = async () => {
    try {
      if (!reservation.spotId || !reservation.vehicleNumber || !reservation.startTime || !reservation.endTime || !reservation.status) {
        alert("Please fill all required fields.");
        return;
      }

      await axios.put(`https://localhost:7024/api/ParkingReservation/${id}`, reservation);
      navigate(PATH_DASHBOARD.parkingReservationManagers, {
        state: { message: "Reservation updated successfully!" },
      });
    } catch (error) {
      console.error("Error updating reservation:", error);
      alert("Error updating reservation.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Parking Reservation</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "400px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="spot-select-label">Parking Spot</InputLabel>
          <Select
            labelId="spot-select-label"
            name="spotId"
            value={reservation.spotId || ""}
            onChange={handleSelectChange}
          >
            {parkingSpots.map((spot) => (
              <MenuItem key={spot.id} value={spot.id}>
                {spot.location} {spot.isAvailable ? "(Available)" : "(Occupied)"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Vehicle Number"
          name="vehicleNumber"
          value={reservation.vehicleNumber}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Start Time"
          name="startTime"
          type="datetime-local"
          value={reservation.startTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          label="End Time"
          name="endTime"
          type="datetime-local"
          value={reservation.endTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            name="status"
            value={reservation.status || ""}
            onChange={handleSelectChange}
          >
            {statuses.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditParkingReservationManager;