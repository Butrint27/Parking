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

type ParkingSpaceManager = {
  id?: string;
  parkingSpaceName: string;
  capacity: number;
};

const BASE_URL = "https://localhost:7024/api/ParkingSpaceManager/Create"; // Adjust to your API endpoint

const AddParkingSpaceManager: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [formValues, setFormValues] = useState<Partial<ParkingSpaceManager>>({
    parkingSpaceName: "",
    capacity: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === "capacity" ? parseInt(value) || 0 : value,
    }));
  };

  const addNewParkingSpaceManager = async () => {
    try {
      setIsAdding(true);
      await axios.post(BASE_URL, formValues);
      setIsAdding(false);
      navigate(PATH_DASHBOARD.parkingSpaceManager); // Redirect to the parking space manager list page
    } catch (error) {
      console.error("Error adding new parking space manager:", error);
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
                Add New Parking Space Manager
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Parking Space Name</TableCell>
              <TableCell>
                <TextField
                  name="parkingSpaceName"
                  value={formValues.parkingSpaceName || ""}
                  onChange={handleInputChange}
                  placeholder="Parking Space Name"
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Capacity</TableCell>
              <TableCell>
                <TextField
                  name="capacity"
                  value={formValues.capacity || ""}
                  onChange={handleInputChange}
                  placeholder="Capacity"
                  type="number"
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Button
                  variant={isAdding ? "outlined" : "contained"}
                  disabled={isAdding}
                  onClick={addNewParkingSpaceManager}
                >
                  {isAdding
                    ? "Adding new parking space manager..."
                    : "Add new parking space manager"}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddParkingSpaceManager;
