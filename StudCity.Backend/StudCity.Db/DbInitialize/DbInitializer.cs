using System;
using System.Collections.Generic;
using System.Linq;
using StudCity.Core.Entities;
using StudCity.Core.Enums;
using StudCity.Core.Interfaces;
using StudCity.Db.Context;
using Role = StudCity.Core.Enums.Role;

namespace StudCity.Db.DbInitialize;

public static class DbInitializer
{
    public static void Seed(StudCityContext context, IPasswordHasher passwordHasher)
    {
        context.Database.EnsureCreated();
        SeedUsers(context, passwordHasher);
        context.SaveChanges();
    }

    private static void SeedUsers(StudCityContext dbContext, IPasswordHasher passwordHasher)
    {
        if (dbContext.Accounts.Any())
        {
            return; // DB has been seeded
        }

        var admin = new Account()
        {
            Email = "studcityadmin@gmail.com",
            Password = passwordHasher.HashPassword("StudCityAdmin-1"),
            AccountRoles = new List<AccountRole>() { new () { RoleId = Role.Admin } },
            User = new User()
            {
                FirstName = "Admin",
                LastName = "Adminovich",
                FullName = "Admin Adminovich",
                Gender = Gender.Male,
                DateOfBirthday = DateTime.Now,

            },
            IsBlocked = false,
        };

        dbContext.Accounts.Add(admin);

    }
}
