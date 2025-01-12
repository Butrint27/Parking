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
export type ParkingSpace = {
  id: string;
  location: string;
  isAvailable: boolean;
};

const ParkingSpaceManager = () => {
  const [parkingSpaces, setParkingSpaces] = useState<ParkingSpace[] | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedParkingSpaceId, setSelectedParkingSpaceId] = useState<string | null>(null);

  const redirect = useNavigate();

  // Fetch data from APIs
  const fetchParkingSpaces = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/ParkingSpace/Get`);
      setParkingSpaces(res.data);
    } catch (error) {
      console.error("Error fetching parking spaces:", error);
    }
  };

  // Delete parking space
  const handleDeleteClick = (id: string) => {
    setSelectedParkingSpaceId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedParkingSpaceId(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedParkingSpaceId) {
      try {
        await axios.delete(`${API_BASE_URL}/ParkingSpace/${selectedParkingSpaceId}`);
        setParkingSpaces(
          (prev) =>
            prev?.filter((space) => space.id !== selectedParkingSpaceId) || null
        );
      } catch (error) {
        console.error("Error deleting parking space:", error);
      } finally {
        handleClose();
      }
    }
  };

  useEffect(() => {
    fetchParkingSpaces();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="column" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => redirect(`${PATH_DASHBOARD.parkingSpaceManager}/add`)}
        >
          Add New Parking Space
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parkingSpaces?.map((space) => (
                <TableRow key={space.id}>
                  <TableCell>{space.id}</TableCell>
                  <TableCell>{space.location}</TableCell>
                  <TableCell>{space.isAvailable ? "Available" : "Occupied"}</TableCell>
                  <TableCell>
                    <Link to={`${PATH_DASHBOARD.parkingSpaceManager}/edit/${space.id}`}>
                      <Button size="small">Edit</Button>
                    </Link>
                    <Button
                      size="small"
                      onClick={() => handleDeleteClick(space.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Parking Space</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this parking space? This action
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

export default ParkingSpaceManager;
