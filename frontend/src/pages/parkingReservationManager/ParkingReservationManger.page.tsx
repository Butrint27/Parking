import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { PATH_DASHBOARD } from "../../routes/paths";

const API_BASE_URL = "https://localhost:7024/api";

type ParkingReservation = {
  id: string;
  spotId: string;
  userId: string;
  startTime: string;
  endTime: string;
  status: string;
};

type ParkingSpot = {
  id: string;
  location: string;
  isAvailable: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
};

const ParkingReservationManager = () => {
  const [reservations, setReservations] = useState<ParkingReservation[]>([]);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/ParkingReservation/Get`);
      setReservations(res.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const fetchParkingSpots = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/ParkingSpot/Get`);
      setParkingSpots(res.data);
    } catch (error) {
      console.error("Error fetching parking spots:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/User/Get`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedReservationId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReservationId(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedReservationId) {
      try {
        await axios.delete(`${API_BASE_URL}/ParkingReservation/${selectedReservationId}`);
        setReservations((prev) => prev.filter((r) => r.id !== selectedReservationId));
      } catch (error) {
        console.error("Error deleting reservation:", error);
      } finally {
        handleClose();
      }
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchParkingSpots();
    fetchUsers();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="column" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => navigate(`${PATH_DASHBOARD.parkingReservationManagers}/add`)}
        >
          Add New Reservation
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Parking Spot</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => {
                const parkingSpot = parkingSpots.find((spot) => spot.id === reservation.spotId);
                const user = users.find((u) => u.id === reservation.userId);

                return (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.id}</TableCell>
                    <TableCell>{parkingSpot?.location || "Unknown"}</TableCell>
                    <TableCell>{user?.name || "Unknown"}</TableCell>
                    <TableCell>{format(new Date(reservation.startTime), "dd-MM-yyyy HH:mm")}</TableCell>
                    <TableCell>{format(new Date(reservation.endTime), "dd-MM-yyyy HH:mm")}</TableCell>
                    <TableCell>{reservation.status}</TableCell>
                    <TableCell>
                      <Link to={`/dashboard/parking-reservations/edit/${reservation.id}`}>
                        <Button size="small">Edit</Button>
                      </Link>
                      <Button size="small" onClick={() => handleDeleteClick(reservation.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Reservation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this reservation? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="secondary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
};

export default ParkingReservationManager;