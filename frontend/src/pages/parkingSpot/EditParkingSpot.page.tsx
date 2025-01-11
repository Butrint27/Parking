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

type ParkingSpot = {
  id: string;
  location: string;
  status: string;
  reservationId: string | null;
};

type Reservation = {
  id: string;
  customerName: string;
  startTime: string;
  endTime: string;
};

const statuses = [
  { value: "Available", label: "Available" },
  { value: "Occupied", label: "Occupied" },
  { value: "Reserved", label: "Reserved" },
];

const EditParkingSpot: React.FC = () => {
  const [parkingSpot, setParkingSpot] = useState<Partial<ParkingSpot>>({
    location: "",
    status: "",
    reservationId: null,
  });

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getParkingSpotById = async () => {
    try {
      const response = await axios.get<ParkingSpot>(
        `https://localhost:7024/api/ParkingSpot/${id}`
      );
      setParkingSpot(response.data);
    } catch (error) {
      console.error("Error fetching parking spot:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get<Reservation[]>(
        "https://localhost:7024/api/Reservation/Get"
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getParkingSpotById();
      fetchReservations();
    }
  }, [id]);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = event.target;
    setParkingSpot((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setParkingSpot((prev) => ({
      ...prev,
      [name!]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!parkingSpot.location || !parkingSpot.status) {
        alert("Please fill all required fields.");
        return;
      }

      await axios.put(
        `https://localhost:7024/api/ParkingSpot/${id}`,
        parkingSpot
      );
      navigate(PATH_DASHBOARD.parkingSpot, {
        state: { message: "Parking spot updated successfully!" },
      });
    } catch (error) {
      console.error("Error updating parking spot:", error);
      alert("Error updating parking spot.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Parking Spot</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="Location"
          name="location"
          value={parkingSpot.location || ""}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            name="status"
            value={parkingSpot.status || ""}
            onChange={handleSelectChange}
          >
            {statuses.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="reservation-select-label">Reservation</InputLabel>
          <Select
            labelId="reservation-select-label"
            name="reservationId"
            value={parkingSpot.reservationId || ""}
            onChange={handleSelectChange}
          >
            <MenuItem value="">None</MenuItem>
            {reservations.map((reservation) => (
              <MenuItem key={reservation.id} value={reservation.id}>
                {`${reservation.customerName} (Start: ${reservation.startTime}, End: ${reservation.endTime})`}
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

export default EditParkingSpot;