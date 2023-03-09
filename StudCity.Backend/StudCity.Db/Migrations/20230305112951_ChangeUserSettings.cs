using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudCity.Db.Migrations
{
    public partial class ChangeUserSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BackgroundImageId",
                table: "Settings",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Settings_BackgroundImageId",
                table: "Settings",
                column: "BackgroundImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_Images_BackgroundImageId",
                table: "Settings",
                column: "BackgroundImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Settings_Images_BackgroundImageId",
                table: "Settings");

            migrationBuilder.DropIndex(
                name: "IX_Settings_BackgroundImageId",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "BackgroundImageId",
                table: "Settings");
        }
    }
}
