import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths";

type FormValues = {
  parkingSpotId: string;
  vehicleNumber: string;
  reservationDate: string;
  duration: number; // in hours
  status: string;
};

type ParkingSpot = {
  id: string;
  location: string;
  isAvailable: boolean;
};

export const reservationStatuses = [
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
];

const initialValues = {
  parkingSpotId: "",
  vehicleNumber: "",
  reservationDate: "",
  duration: 0,
  status: "",
};

const AddParkingReservationManager: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [parkingSpotsList, setParkingSpotsList] = useState<ParkingSpot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch parking spots from the API
  const fetchParkingSpots = async () => {
    try {
      const res = await axios.get<ParkingSpot[]>(
        "https://localhost:7024/api/ParkingSpot/GetAvailable"
      );
      setParkingSpotsList(res.data);
    } catch (error) {
      console.error("Error fetching parking spots:", error);
      setError("Error fetching parking spots. Please try again.");
    }
  };

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  // Handle form input changes
  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const { parkingSpotId, vehicleNumber, reservationDate, duration, status } =
      formValues;

    return (
      parkingSpotId &&
      vehicleNumber.trim() !== "" &&
      reservationDate.trim() !== "" &&
      duration > 0 &&
      status.trim() !== ""
    );
  };

  // Add a new parking reservation
  const addNewReservation = async () => {
    try {
      setIsAdding(true);
      setError(null);
      setSuccessMessage(null);

      await axios.post(
        "https://localhost:7024/api/ParkingReservation/Create",
        formValues
      );

      setSuccessMessage("Reservation added successfully!");
      setFormValues(initialValues);
      navigate(PATH_DASHBOARD.parkingReservationManagers);
    } catch (error: any) {
      console.error("Error adding new reservation:", error);
      setError(
        error.response?.data?.message ||
          "Error adding new reservation. Please try again."
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        padding: 2,
      }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">
                Add New Parking Reservation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell colSpan={2} align="center" style={{ color: "red" }}>
                  {error}
                </TableCell>
              </TableRow>
            )}
            {successMessage && (
              <TableRow>
                <TableCell
                  colSpan={2}
                  align="center"
                  style={{ color: "green" }}
                >
                  {successMessage}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Parking Spot</TableCell>
              <TableCell>
                <Select
                  name="parkingSpotId"
                  value={formValues.parkingSpotId}
                  onChange={(e) =>
                    handleInputChange(
                      e as { target: { name: string; value: string } }
                    )
                  }
                  fullWidth
                >
                  {parkingSpotsList.map((spot) => (
                    <MenuItem key={spot.id} value={spot.id}>
                      {spot.location}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>
                <TextField
                  name="vehicleNumber"
                  onChange={handleInputChange}
                  value={formValues.vehicleNumber}
                  placeholder="Vehicle Number"
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reservation Date</TableCell>
              <TableCell>
                <TextField
                  name="reservationDate"
                  type="date"
                  onChange={handleInputChange}
                  value={formValues.reservationDate}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Duration (hours)</TableCell>
              <TableCell>
                <TextField
                  name="duration"
                  type="number"
                  onChange={handleInputChange}
                  value={formValues.duration}
                  placeholder="Duration"
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                <Select
                  name="status"
                  value={formValues.status}
                  onChange={(e) =>
                    handleInputChange(
                      e as { target: { name: string; value: string } }
                    )
                  }
                  fullWidth
                >
                  {reservationStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Button
                  variant={isAdding ? "outlined" : "contained"}
                  disabled={isAdding || !isFormValid()}
                  onClick={addNewReservation}
                >
                  {isAdding ? "Adding new reservation..." : "Add Reservation"}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddParkingReservationManager;