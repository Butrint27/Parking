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
import { PATH_DASHBOARD } from "../../routes/paths";

const API_BASE_URL = "https://localhost:7024/api";

// Define the types
export type ParkingSpot = {
  id: string;
  location: string;
  status: string;
  reservationId: string | null;
};

export type Reservation = {
  id: string;
  customerName: string;
  startTime: string;
  endTime: string;
};

const ParkingSpots = () => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[] | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);

  const redirect = useNavigate();

  // Fetch data from APIs
  const fetchParkingSpots = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/ParkingSpot/Get`);
      setParkingSpots(res.data);
    } catch (error) {
      console.error("Error fetching parking spots:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/Reservation/Get`);
      setReservations(res.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  // Delete parking spot
  const handleDeleteClick = (id: string) => {
    setSelectedSpotId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSpotId(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSpotId) {
      try {
        await axios.delete(`${API_BASE_URL}/ParkingSpot/${selectedSpotId}`);
        setParkingSpots(
          (prev) => prev?.filter((spot) => spot.id !== selectedSpotId) || null
        );
      } catch (error) {
        console.error("Error deleting parking spot:", error);
      } finally {
        handleClose();
      }
    }
  };

  useEffect(() => {
    fetchParkingSpots();
    fetchReservations();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="column" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => redirect(`${PATH_DASHBOARD.parkingSpot}/add`)}
        >
          Add New Parking Spot
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reservation</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parkingSpots?.map((spot) => {
                const reservation = reservations.find(
                  (res) => res.id === spot.reservationId
                );

                return (
                  <TableRow key={spot.id}>
                    <TableCell>{spot.id}</TableCell>
                    <TableCell>{spot.location}</TableCell>
                    <TableCell>{spot.status}</TableCell>
                    <TableCell>
                      {reservation
                        ? `Reserved by ${reservation.customerName} (Start: ${reservation.startTime}, End: ${reservation.endTime})`
                        : "Available"}
                    </TableCell>
                    <TableCell>
                      <Link to={`${PATH_DASHBOARD.parkingSpot}/edit/${spot.id}`}>
                        <Button size="small">Edit</Button>
                      </Link>
                      <Button
                        size="small"
                        onClick={() => handleDeleteClick(spot.id)}
                      >
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
          <DialogTitle>Delete Parking Spot</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this parking spot? This action
              cannot be undone.
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

export default ParkingSpots;