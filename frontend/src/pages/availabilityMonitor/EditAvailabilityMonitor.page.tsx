import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

type AvailabilityMonitor = {
  id: string;
  name: string;
  status: string;
};

const EditAvailabilityMonitor: React.FC = () => {
  const [availabilityMonitor, setAvailabilityMonitor] = useState<Partial<AvailabilityMonitor>>({
    name: "",
    status: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvailabilityMonitor({
      ...availabilityMonitor,
      [event.target.name]: event.target.value,
    });
  };

  const getAvailabilityMonitorById = async () => {
    try {
      const response = await axios.get<AvailabilityMonitor>(
        `https://localhost:7024/api/AvailabilityMonitor/${id}`
      );
      const { data } = response;
      setAvailabilityMonitor({
        name: data.name,
        status: data.status,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue fetching the availability monitor details.",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    if (id) {
      getAvailabilityMonitorById();
    }
  }, [id]);

  const handleSaveBtnClick = async () => {
    if (availabilityMonitor.name === "" || availabilityMonitor.status === "") {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please fill in all fields.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const data: Partial<AvailabilityMonitor> = {
        name: availabilityMonitor.name,
        status: availabilityMonitor.status,
      };
      await axios.put(`https://localhost:7024/api/AvailabilityMonitor/${id}`, data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Availability monitor updated successfully.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(-1);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue updating the availability monitor.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  return (
    <div className="edit-availability-monitor">
      <div className="edit-availability-monitor-content">
        <h2>Edit Availability Monitor</h2>
        <div className="form">
          <TextField
            autoComplete="off"
            label="Name"
            variant="outlined"
            name="name"
            value={availabilityMonitor.name}
            onChange={changeHandler}
            fullWidth
          />
          <TextField
            autoComplete="off"
            label="Status"
            variant="outlined"
            name="status"
            value={availabilityMonitor.status}
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

export default EditAvailabilityMonitor;
