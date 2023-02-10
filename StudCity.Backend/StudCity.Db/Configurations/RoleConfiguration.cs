using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StudCity.Core.Entities;

namespace StudCity.Db.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasData(new[]
        {
            new Role { Id = Core.Enums.Role.User, Name = "User" },
            new Role { Id = Core.Enums.Role.Admin, Name = "Admin" },
            new Role { Id = Core.Enums.Role.Student, Name = "Student" },
            new Role { Id = Core.Enums.Role.Teacher, Name = "Teacher" } 
        });
        
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Id).ValueGeneratedNever();
        builder.Property(r => r.Name).IsRequired().HasMaxLength(30);
    }
}