using System.Reflection;
using Microsoft.EntityFrameworkCore;
using StudCity.Core.Entities;

namespace StudCity.Db.Context;

public class StudCityContext : DbContext
{
    public StudCityContext(DbContextOptions<StudCityContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<AccountRole> AccountRoles { get; set; }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<AccountToken> AccountTokens { get; set; }

    public virtual DbSet<Settings> SettingsSet { get; set; }

    public virtual DbSet<TeacherStore> TeachersStore { get; set; }
}
