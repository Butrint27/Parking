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

export const statuses = [
  { label: "Available", value: "Available" },
  { label: "Occupied", value: "Occupied" },
  { label: "Reserved", value: "Reserved" },
];

const initialValues: FormValues = {
  location: "",
  status: "",
  reservationId: null,
};

export const AddParkingSpot = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [reservationsList, setReservationsList] = useState<Reservation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch reservations from the API
  const fetchReservations = async () => {
    try {
      const res = await axios.get<Reservation[]>(
        "https://localhost:7024/api/Reservation/Get"
      );
      setReservationsList(res.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setError("Error fetching reservations. Please try again.");
    }
  };

  useEffect(() => {
    fetchReservations();
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
    const { location, status } = formValues;
    return location.trim() !== "" && status.trim() !== "";
  };

  // Add a new parking spot
  const addNewParkingSpot = async () => {
    try {
      setIsAdding(true);
      setError(null);
      setSuccessMessage(null);

      await axios.post(
        "https://localhost:7024/api/ParkingSpot/Create",
        formValues
      );

      setSuccessMessage("Parking spot added successfully!");
      setFormValues(initialValues);
      navigate(PATH_DASHBOARD.parkingSpot);
    } catch (error: any) {
      console.error("Error adding new parking spot:", error);
      setError(
        error.response?.data?.message ||
          "Error adding new parking spot. Please try again."
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
                Add New Parking Spot
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
              <TableCell>Location</TableCell>
              <TableCell>
                <TextField
                  name="location"
                  onChange={handleInputChange}
                  value={formValues.location}
                  placeholder="Location"
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
                  {statuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reservation</TableCell>
              <TableCell>
                <Select
                  name="reservationId"
                  value={formValues.reservationId || ""}
                  onChange={(e) =>
                    handleInputChange(
                      e as { target: { name: string; value: string } }
                    )
                  }
                  fullWidth
                >
                  <MenuItem value="">None</MenuItem>
                  {reservationsList.map((reservation) => (
                    <MenuItem key={reservation.id} value={reservation.id}>
                      {`${reservation.customerName} (Start: ${reservation.startTime}, End: ${reservation.endTime})`}
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
                  onClick={addNewParkingSpot}
                >
                  {isAdding ? "Adding parking spot..." : "Add parking spot"}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddParkingSpot;