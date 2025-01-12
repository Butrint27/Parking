import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
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
  DialogTitle,
  DialogContentText,
  Stack,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths";

// Define the types
type Availability = {
  id: string;
  status: string;
  date: string;
  details: string;
};

const AvailabilityMonitor: React.FC = () => {
  const [availabilityData, setAvailabilityData] = useState<Availability[]>([]);
  const [selectedAvailabilityID, setSelectedAvailabilityID] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const baseUrl = "https://localhost:7024/api/AvailabilityMonitor/Get"; // replace with your actual URL
  const deleteURL = "https://localhost:7024/api/AvailabilityMonitor"; // replace with your actual URL

  const location = useLocation();
  const redirect = useNavigate();

  // Fetch the availability data
  const fetchAvailabilityData = async () => {
    try {
      const response = await axios.get<Availability[]>(baseUrl);
      setAvailabilityData(response.data);
      if (location?.state) {
        Swal.fire({
          icon: "success",
          title: location?.state?.message,
        });
        redirect(location.pathname, { replace: true });
      }
    } catch (error) {
      alert("An error occurred while fetching availability data.");
    }
  };

  // Handle delete click
  const handleDeleteClick = (id: string) => {
    setSelectedAvailabilityID(id);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAvailabilityID(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (selectedAvailabilityID) {
      try {
        await axios.delete(`${deleteURL}/${selectedAvailabilityID}`);
        setAvailabilityData((prevData) =>
          prevData.filter((data) => data.id !== selectedAvailabilityID)
        );
      } catch (error) {
        console.error("Failed to delete availability data:", error);
      } finally {
        handleCloseDialog();
      }
    }
  };

  useEffect(() => {
    fetchAvailabilityData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="column" spacing={2}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => redirect(`${PATH_DASHBOARD.availabilityMonitor}/add`)}
          sx={{ alignSelf: "flex-end" }}
        >
          Add New Availability
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availabilityData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.status}</TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.details}</TableCell>
                  <TableCell>
                    <Link to={`${PATH_DASHBOARD.availabilityMonitor}/edit/${data.id}`}>
                      <Button size="small">Edit</Button>
                    </Link>
                    <Button
                      size="small"
                      onClick={() => handleDeleteClick(data.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Delete Availability</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this availability? This action
              cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="secondary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
};

export default AvailabilityMonitor;
