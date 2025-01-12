import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { PATH_DASHBOARD } from "../../routes/paths";

// Define the ParkingSpaceManager type
type ParkingSpaceManager = {
  id: string;
  parkingSpaceName: string;
  capacity: number;
};

const EditParkingSpaceManager: React.FC = () => {
  const [parkingSpaceManager, setParkingSpaceManager] = useState<Partial<ParkingSpaceManager>>({
    parkingSpaceName: "",
    capacity: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Function to handle input change
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setParkingSpaceManager({
      ...parkingSpaceManager,
      [name]: name === "capacity" ? parseInt(value) || 0 : value,
    });
  };

  // Function to fetch parking space manager by ID
  const getParkingSpaceManagerById = async () => {
    try {
      const response = await axios.get<ParkingSpaceManager>(
        `https://localhost:7024/api/ParkingSpaceManager/${id}`
      );
      const { data } = response;
      setParkingSpaceManager({
        parkingSpaceName: data.parkingSpaceName,
        capacity: data.capacity,
      });
    } catch (error) {
      console.error("Error fetching parking space manager:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue fetching the parking space manager details.",
        confirmButtonText: "OK",
      });
    }
  };

  // Fetch parking space manager details when component is mounted
  useEffect(() => {
    if (id) {
      getParkingSpaceManagerById();
    }
  }, [id]);

  // Function to handle saving the edited parking space manager
  const handleSaveBtnClick = async () => {
    if (parkingSpaceManager.parkingSpaceName === "" || parkingSpaceManager.capacity === 0) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please fill in all fields with valid data.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const data: Partial<ParkingSpaceManager> = {
        parkingSpaceName: parkingSpaceManager.parkingSpaceName,
        capacity: parkingSpaceManager.capacity,
      };
      await axios.put(
        `https://localhost:7024/api/ParkingSpaceManager/${id}`,
        data
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Parking space manager updated successfully.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(PATH_DASHBOARD.parkingSpaceManager, {
          state: { message: "Parking Space Manager Updated Successfully" },
        });
      });
    } catch (error) {
      console.error("Error saving parking space manager:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue updating the parking space manager.",
        confirmButtonText: "OK",
      });
    }
  };

  // Function to navigate back
  const handleBackBtnClick = () => {
    navigate(PATH_DASHBOARD.parkingSpaceManager);
  };

  return (
    <div className="edit-parking-space-manager">
      <div className="edit-parking-space-manager-content">
        <h2>Edit Parking Space Manager</h2>
        <div className="form">
          <TextField
            autoComplete="off"
            label="Parking Space Name"
            variant="outlined"
            name="parkingSpaceName"
            value={parkingSpaceManager.parkingSpaceName || ""}
            onChange={changeHandler}
            fullWidth
          />
          <TextField
            autoComplete="off"
            label="Capacity"
            variant="outlined"
            name="capacity"
            type="number"
            value={parkingSpaceManager.capacity || ""}
            onChange={changeHandler}
            fullWidth
          />
        </div>

        <div className="button-container">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSaveBtnClick}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBackBtnClick}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditParkingSpaceManager;
