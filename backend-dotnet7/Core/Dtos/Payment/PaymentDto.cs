﻿namespace backend_dotnet7.Core.Dtos.Payment
{
    public class PaymentDto
    {
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        public string Status { get; set; }
    }
}