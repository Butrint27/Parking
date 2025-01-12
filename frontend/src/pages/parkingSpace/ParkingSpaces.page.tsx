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

// Define types
export type ParkingSpace = {
  id: string;
  location: string;
  size: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  pricePerHour: number;
};

export type ParkingSpaceManager = {
  id: string;
  status: string;
  pagesa: number;
  kontakti: string;
  parkingSpaceId: string;
};

export type AvailabilityMonitor = {
  id: string;
  status: string;
  lastCheckedTime: string;
  upTime: string;
  downTime: string;
  checkInterval: number;
  parkingSpaceId: string;
};

const ParkingSpaces = () => {
  const [parkingSpaces, setParkingSpaces] = useState<ParkingSpace[]>([]);
  const [managers, setManagers] = useState<ParkingSpaceManager[]>([]);
  const [availabilityMonitors, setAvailabilityMonitors] = useState<
    AvailabilityMonitor[]
  >([]);
  const [open, setOpen] = useState(false);
  const [selectedParkingSpaceId, setSelectedParkingSpaceId] = useState<
    string | null
  >(null);

  const redirect = useNavigate();

  const fetchParkingSpaces = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/ParkingSpace`);
      setParkingSpaces(res.data);
    } catch (error) {
      console.error("Error fetching parking spaces:", error);
    }
  };

  const fetchManagers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/ParkingSpaceManager`);
      setManagers(res.data);
    } catch (error) {
      console.error("Error fetching parking space managers:", error);
    }
  };

  const fetchAvailabilityMonitors = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/AvailabilityMonitor`);
      setAvailabilityMonitors(res.data);
    } catch (error) {
      console.error("Error fetching availability monitors:", error);
    }
  };

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
        setParkingSpaces((prev) =>
          prev.filter((space) => space.id !== selectedParkingSpaceId)
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
    fetchManagers();
    fetchAvailabilityMonitors();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="column" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => redirect(`${PATH_DASHBOARD.parkingSpace}/add`)}
        >
          Add New Parking Space
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Price Per Hour</TableCell>
                <TableCell>Manager Contact</TableCell>
                <TableCell>Availability Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parkingSpaces.map((space) => {
                const manager = managers.find(
                  (m) => m.parkingSpaceId === space.id
                );
                const monitor = availabilityMonitors.find(
                  (m) => m.parkingSpaceId === space.id
                );

                return (
                  <TableRow key={space.id}>
                    <TableCell>{space.id}</TableCell>
                    <TableCell>{space.location}</TableCell>
                    <TableCell>{space.size}</TableCell>
                    <TableCell>{space.status}</TableCell>
                    <TableCell>{space.pricePerHour}</TableCell>
                    <TableCell>{manager?.kontakti || "Unknown"}</TableCell>
                    <TableCell>{monitor?.status || "Unknown"}</TableCell>
                    <TableCell>
                      <Link to={`/parkingSpaces/edit/${space.id}`}>
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
                );
              })}
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

export default ParkingSpaces;
