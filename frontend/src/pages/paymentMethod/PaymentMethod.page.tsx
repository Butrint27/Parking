import { useState, useEffect } from "react";
import axios from "axios";
// import { IPaymentMethod } from "../../types/paymentMethod.types"; // adjust path if needed
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
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

type PaymentMethod = {
  id: string;
  type: string;
  details: string;
};

const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethodID, setSelectedPaymentMethodID] = useState<
    string | null
  >(null);
  const [openDialog, setOpenDialog] = useState(false);

  const baseUrl = "https://localhost:7149/api/PaymentMethod/Get"; // replace with your actual URL
  const deleteURL = "https://localhost:7149/api/PaymentMethod"; // replace with your actual URL

  const location = useLocation();
  const redirect = useNavigate();

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get<PaymentMethod[]>(baseUrl);
      setPaymentMethods(response.data);
      if (location?.state) {
        Swal.fire({
          icon: "success",
          title: location?.state?.message,
        });
        redirect(location.pathname, { replace: true });
      }
    } catch (error) {
      alert("An error occurred while fetching payment methods.");
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedPaymentMethodID(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPaymentMethodID(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPaymentMethodID) {
      try {
        await axios.delete(`${deleteURL}/${selectedPaymentMethodID}`);
        setPaymentMethods((prevMethods) =>
          prevMethods.filter((method) => method.id !== selectedPaymentMethodID)
        );
      } catch (error) {
        console.error("Failed to delete payment method:", error);
      } finally {
        handleCloseDialog();
      }
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
      <Button
        variant="outlined"
        onClick={() => redirect("/paymentMethods/add")}
        sx={{ alignSelf: "flex-end" }}
      >
        Add New Payment Method
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentMethods.map((method) => (
              <TableRow key={method.id}>
                <TableCell>{method.id}</TableCell>
                <TableCell>{method.type}</TableCell>
                <TableCell>{method.details}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() =>
                      redirect(`/paymentMethods/edit/${method.id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDeleteClick(method.id)}
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
        <DialogTitle>Delete Payment Method</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this payment method? This action
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
    </Box>
  );
};

export default PaymentMethods;
