using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_dotnet7.Migrations
{
    /// <inheritdoc />
    public partial class krijovaKLasatEReja : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ParkingSpaces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PricePerHour = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingSpaces", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AvailabilityMonitors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastCheckedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DownTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CheckInterval = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ParkingSpaceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvailabilityMonitors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AvailabilityMonitors_ParkingSpaces_ParkingSpaceId",
                        column: x => x.ParkingSpaceId,
                        principalTable: "ParkingSpaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ParkingSpaceManagers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pagesa = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Kontakti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParkingSpaceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingSpaceManagers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParkingSpaceManagers_ParkingSpaces_ParkingSpaceId",
                        column: x => x.ParkingSpaceId,
                        principalTable: "ParkingSpaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AvailabilityMonitors_ParkingSpaceId",
                table: "AvailabilityMonitors",
                column: "ParkingSpaceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ParkingSpaceManagers_ParkingSpaceId",
                table: "ParkingSpaceManagers",
                column: "ParkingSpaceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AvailabilityMonitors");

            migrationBuilder.DropTable(
                name: "ParkingSpaceManagers");

            migrationBuilder.DropTable(
                name: "ParkingSpaces");
        }
    }
}
