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

type ParkingSpace = {
  id: string;
  location: string;
  size: string;
  isAvailable: boolean;
  parkingLotId: string;
};

type ParkingLot = {
  id: string;
  name: string;
  address: string;
};

const EditParkingSpace: React.FC = () => {
  const [parkingSpace, setParkingSpace] = useState<Partial<ParkingSpace>>({
    location: "",
    size: "",
    isAvailable: false,
    parkingLotId: "",
  });

  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchParkingSpaceById = async () => {
    try {
      const response = await axios.get<ParkingSpace>(
        `https://localhost:7024/api/ParkingSpace/${id}`
      );
      setParkingSpace(response.data);
    } catch (error) {
      console.error("Error fetching parking space:", error);
    }
  };

  const fetchParkingLots = async () => {
    try {
      const response = await axios.get<ParkingLot[]>(
        "https://localhost:7024/api/ParkingLot/Get"
      );
      setParkingLots(response.data);
    } catch (error) {
      console.error("Error fetching parking lots:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchParkingSpaceById();
      fetchParkingLots();
    }
  }, [id]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setParkingSpace((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setParkingSpace((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!parkingSpace.location || !parkingSpace.size || !parkingSpace.parkingLotId) {
        alert("Please fill all required fields.");
        return;
      }

      await axios.put(`https://localhost:7024/api/ParkingSpace/${id}`, parkingSpace);
      navigate("/dashboard/parking-spaces", {
        state: { message: "Parking space updated successfully!" },
      });
    } catch (error) {
      console.error("Error updating parking space:", error);
      alert("Error updating parking space.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Parking Space</h2>
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
          value={parkingSpace.location}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Size"
          name="size"
          value={parkingSpace.size}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="availability-label">Availability</InputLabel>
          <Select
            labelId="availability-label"
            name="isAvailable"
            value={String(parkingSpace.isAvailable)}
            onChange={(e) =>
              setParkingSpace((prev) => ({
                ...prev,
                isAvailable: e.target.value === "true",
              }))
            }
          >
            <MenuItem value="true">Available</MenuItem>
            <MenuItem value="false">Not Available</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="parking-lot-select-label">Parking Lot</InputLabel>
          <Select
            labelId="parking-lot-select-label"
            name="parkingLotId"
            value={parkingSpace.parkingLotId || ""}
            onChange={handleSelectChange}
          >
            {parkingLots.map((lot) => (
              <MenuItem key={lot.id} value={lot.id}>
                {lot.name} ({lot.address})
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

export default EditParkingSpace;
