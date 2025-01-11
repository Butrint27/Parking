import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormValues = {
  amount: number;
  date: string;
  status: string;
  invoiceId: string;
  paymentMethodId: string;
};

type Invoice = {
  id: string;
  totalAmount: number;
  dateGenerated: string;
};

type PaymentMethod = {
  id: string;
  type: string;
  details: string;
};

export const AddPayment = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    amount: 0,
    date: "",
    status: "",
    invoiceId: "",
    paymentMethodId: "",
  });
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
  const [paymentMethodsList, setPaymentMethodsList] = useState<PaymentMethod[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch invoices from the API
  const fetchInvoices = async () => {
    try {
      const res = await axios.get<Invoice[]>(
        "https://localhost:7149/api/Invoice"
      );
      setInvoicesList(res.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setError("Error fetching invoices. Please try again.");
    }
  };

  // Fetch payment methods from the API
  const fetchPaymentMethods = async () => {
    try {
      const res = await axios.get<PaymentMethod[]>(
        "https://localhost:7149/api/PaymentMethod"
      );
      setPaymentMethodsList(res.data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      setError("Error fetching payment methods. Please try again.");
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchPaymentMethods();
  }, []);

  // Handle form input changes
  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Add a new payment
  const addNewPayment = async () => {
    try {
      setIsAdding(true);
      await axios.post("https://localhost:7149/api/Payment/Create", formValues);
      setIsAdding(false);
      navigate("/payments");
    } catch (error) {
      console.log("Error adding new payment:", error);
      setError("Error adding new payment. Please try again.");
      setIsAdding(false);
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
                Add New Payment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>
                <TextField
                  name="amount"
                  type="number"
                  onChange={handleInputChange}
                  placeholder="Amount"
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>
                <TextField
                  name="date"
                  type="date"
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                <TextField
                  name="status"
                  onChange={handleInputChange}
                  placeholder="Status"
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Invoice</TableCell>
              <TableCell>
                {error ? (
                  <div>{error}</div>
                ) : (
                  <Select
                    name="invoiceId"
                    value={formValues.invoiceId}
                    onChange={handleInputChange}
                    fullWidth
                  >
                    {invoicesList.map((invoice) => (
                      <MenuItem key={invoice.id} value={invoice.id}>
                        {`Invoice #${invoice.id} - ${invoice.totalAmount} $`}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Payment Method</TableCell>
              <TableCell>
                {error ? (
                  <div>{error}</div>
                ) : (
                  <Select
                    name="paymentMethodId"
                    value={formValues.paymentMethodId}
                    onChange={handleInputChange}
                    fullWidth
                  >
                    {paymentMethodsList.map((method) => (
                      <MenuItem key={method.id} value={method.id}>
                        {method.type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Button
                  variant={isAdding ? "outlined" : "contained"}
                  disabled={isAdding}
                  onClick={addNewPayment}
                >
                  {isAdding ? "Adding new payment..." : "Add new payment"}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddPayment;
