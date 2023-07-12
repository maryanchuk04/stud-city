using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudCity.Db.Migrations
{
    public partial class AuthTypeForAccount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AuthType",
                table: "Accounts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthType",
                table: "Accounts");
        }
    }
}
