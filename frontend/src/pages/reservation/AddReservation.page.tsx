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
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  roomId: string;
  status: string;
};

type Room = {
  id: string;
  roomNumber: string;
  capacity: number;
};

export const reservationStatuses = [
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
];

const initialValues: FormValues = {
  guestName: "",
  checkInDate: "",
  checkOutDate: "",
  roomId: "",
  status: "",
};

const AddReservation = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [roomsList, setRoomsList] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch rooms from the API
  const fetchRooms = async () => {
    try {
      const res = await axios.get<Room[]>("https://localhost:7024/api/Room/Get");
      setRoomsList(res.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Error fetching rooms. Please try again.");
    }
  };

  useEffect(() => {
    fetchRooms();
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
    const { guestName, checkInDate, checkOutDate, roomId, status } = formValues;
    return (
      guestName.trim() !== "" &&
      checkInDate.trim() !== "" &&
      checkOutDate.trim() !== "" &&
      roomId &&
      status
    );
  };

  // Add a new reservation
  const addNewReservation = async () => {
    try {
      setIsAdding(true);
      setError(null);
      setSuccessMessage(null);

      await axios.post(
        "https://localhost:7024/api/Reservation/Create",
        formValues
      );

      setSuccessMessage("Reservation added successfully!");
      setFormValues(initialValues);
      navigate(PATH_DASHBOARD.reservations);
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
                Add New Reservation
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
              <TableCell>Guest Name</TableCell>
              <TableCell>
                <TextField
                  name="guestName"
                  value={formValues.guestName}
                  onChange={handleInputChange}
                  placeholder="Guest Name"
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Check-In Date</TableCell>
              <TableCell>
                <TextField
                  name="checkInDate"
                  type="date"
                  value={formValues.checkInDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Check-Out Date</TableCell>
              <TableCell>
                <TextField
                  name="checkOutDate"
                  type="date"
                  value={formValues.checkOutDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell>
                <Select
                  name="roomId"
                  value={formValues.roomId}
                  onChange={(e) =>
                    handleInputChange(
                      e as { target: { name: string; value: string } }
                    )
                  }
                  fullWidth
                >
                  {roomsList.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {`Room #${room.roomNumber} (Capacity: ${room.capacity})`}
                    </MenuItem>
                  ))}
                </Select>
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
                  {isAdding ? "Adding reservation..." : "Add Reservation"}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddReservation;