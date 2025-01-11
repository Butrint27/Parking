import React, { useEffect, useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type Payment = {
  id: string;
  amount: number;
  date: string;
  status: string;
  paymentMethodId: string;
  invoiceId: string;
};

type Invoice = {
  id: string;
  dateGenerated: string;
  totalAmount: number;
};

type PaymentMethod = {
  id: string;
  type: string;
  details: string;
};

const EditPayment: React.FC = () => {
  const [payment, setPayment] = useState<Partial<Payment>>({
    amount: 0,
    date: "",
    status: "",
    paymentMethodId: "",
    invoiceId: "",
  });

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getPaymentById = async () => {
    try {
      const response = await axios.get<Payment>(
        `https://localhost:7149/api/Payment/${id}`
      );
      setPayment(response.data);
    } catch (error) {
      console.error("Error fetching payment:", error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get<Invoice[]>(
        "https://localhost:7149/api/Invoice"
      );
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get<PaymentMethod[]>(
        "https://localhost:7149/api/PaymentMethod"
      );
      setPaymentMethods(response.data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getPaymentById();
      fetchInvoices();
      fetchPaymentMethods();
    }
  }, [id]);

  // Funksioni për të trajtuar ndryshimet në fushat e inputeve të zakonshme
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPayment((prev) => ({
      ...prev,
      [name!]: value,
    }));
  };

  // Funksioni specifik për Select
  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setPayment((prev) => ({
      ...prev,
      [name!]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!payment.amount || !payment.date || !payment.status) {
        alert("Please fill all required fields.");
        return;
      }

      await axios.put(`https://localhost:7149/api/Payment/${id}`, payment);
      navigate("/payments", {
        state: { message: "Payment updated successfully!" },
      });
    } catch (error) {
      console.error("Error updating payment:", error);
      alert("Error updating payment.");
    }
  };

  const handleBack = () => {
    navigate("/payments");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Payment</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="Amount"
          name="amount"
          value={payment.amount}
          type="number"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Date"
          name="date"
          value={payment.date}
          type="date"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Status"
          name="status"
          value={payment.status}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="invoice-select-label">Invoice</InputLabel>
          <Select
            labelId="invoice-select-label"
            name="invoiceId"
            value={payment.invoiceId || ""}
            onChange={handleSelectChange}
          >
            {invoices.map((invoice) => (
              <MenuItem key={invoice.id} value={invoice.id}>
                {`Invoice #${invoice.id} - ${invoice.totalAmount} $`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="payment-method-select-label">
            Payment Method
          </InputLabel>
          <Select
            labelId="payment-method-select-label"
            name="paymentMethodId"
            value={payment.paymentMethodId || ""}
            onChange={handleSelectChange}
          >
            {paymentMethods.map((method) => (
              <MenuItem key={method.id} value={method.id}>
                {method.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPayment;
