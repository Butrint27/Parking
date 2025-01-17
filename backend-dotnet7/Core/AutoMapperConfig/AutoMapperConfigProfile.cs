﻿using AutoMapper;
using backend_dotnet7.Core.Dtos;
using backend_dotnet7.Core.Dtos.AvailabilityMonitor;
using backend_dotnet7.Core.Dtos.Invoice;
using backend_dotnet7.Core.Dtos.ParkingReservationManager;
using backend_dotnet7.Core.Dtos.ParkingSpace;
using backend_dotnet7.Core.Dtos.ParkingSpaceManager;
using backend_dotnet7.Core.Dtos.ParkingSpot;
using backend_dotnet7.Core.Dtos.Payment;
using backend_dotnet7.Core.Dtos.PaymentMethod;
using backend_dotnet7.Core.Dtos.Reservation;

using backend_dotnet7.Core.Entities;
using System.Security.Cryptography.Xml;

namespace backend_dotnet7.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile:Profile 
    {
        public AutoMapperConfigProfile() {

            CreateMap<ReservationDTO,Reservation>();
            CreateMap<Reservation,ReservationDTO>();

            CreateMap<ParkingReservationManagerDTO,ParkingReservationManager>();
            CreateMap<ParkingReservationManager,ParkingReservationManagerDTO>();

            CreateMap<ParkingSpotDTO,ParkingSpot>();
            CreateMap<ParkingSpot,ParkingSpotDTO>();

            CreateMap<PaymentDto,Payment>();
            CreateMap<Payment, PaymentDto>();

            CreateMap<PaymentMethodDto,PaymentMethod>();
            CreateMap<PaymentMethod,PaymentMethodDto>();

            CreateMap<InvoiceDto,Invoice>();
            CreateMap<Invoice,InvoiceDto>();

            CreateMap<ParkingSpaceDto, ParkingSpace>();
            CreateMap<ParkingSpace, ParkingSpaceDto>();

            CreateMap<ParkingSpaceManagerDto, ParkingSpaceManager>();
            CreateMap<ParkingSpaceManager, ParkingSpaceManagerDto>();

            CreateMap<AvailabilityMonitorDto, AvailabilityMonitor>();
            CreateMap<AvailabilityMonitor, AvailabilityMonitorDto>();



        }
    }
}
