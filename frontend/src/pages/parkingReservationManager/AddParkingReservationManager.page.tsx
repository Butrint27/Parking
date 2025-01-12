import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import { PATH_DASHBOARD } from "../../routes/paths";
import { ParkingReservationManager } from "./ParkingReservationManger.page";

const BASE_URL = "https://localhost:7024/api/ParkingReservationManager/Create"; // Adjust to your API

const AddParkingReservationManager: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [formValues, setFormValues] = useState<
    Partial<ParkingReservationManager>
  >({
    managerName: "",
    managerContact: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const addNewParkingReservationManager = async () => {
    try {
      setIsAdding(true);
      await axios.post(BASE_URL, formValues);
      setIsAdding(false);
      navigate(PATH_DASHBOARD.parkingReservationManagers); // Redirect to the managers list page
    } catch (error) {
      console.log("Error adding new parking reservation manager:", error);
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
                Add New Parking Reservation Manager
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Manager Name</TableCell>
              <TableCell>
                <TextField
                  name="managerName"
                  value={formValues.managerName || ""}
                  onChange={handleInputChange}
                  placeholder="Manager Name"
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Manager Contact</TableCell>
              <TableCell>
                <TextField
                  name="managerContact"
                  value={formValues.managerContact || ""}
                  onChange={handleInputChange}
                  placeholder="Manager Contact"
                  fullWidth
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} align="center">
                <Button
                  variant={isAdding ? "outlined" : "contained"}
                  disabled={isAdding}
                  onClick={addNewParkingReservationManager}
                >
                  {isAdding ? "Adding new manager..." : "Add new manager"}
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
