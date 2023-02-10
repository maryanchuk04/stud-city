using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using StudCity.Application.Helpers;
using StudCity.Application.Providers;
using StudCity.Application.Services;
using StudCity.Core.ConfigurationModels;
using StudCity.Core.Interfaces;
using StudCity.Core.Interfaces.Providers;
using StudCity.Db.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region Binding

var jwtConfiguration = new JwtConfiguration();
builder.Configuration.GetSection("Jwt").Bind(jwtConfiguration);

#endregion

#region ConfigureServices
builder.Services.AddSingleton(jwtConfiguration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContextFactory<StudCityContext>(
    options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("ApplicationDbConnectionString"),
        b => b.MigrationsAssembly("StudCity.Db")),
        ServiceLifetime.Scoped
    );
builder.Services.AddSingleton<IPasswordHasher, PasswordHasherService>();
builder.Services.AddScoped<IAuthenticateService, AuthenticateServices>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ITokenProvider, TokenProvider>();
builder.Services.AddScoped<IPinGenerator, PinGenerator>();

#endregion


#region SwaggerConfiguration

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        },
    });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});



#endregion


var app = builder.Build();

app.UseSwaggerUI();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

}

app.UseSwagger();
app.UseCors(x =>
{
    x.AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed(origin => true)
        .AllowCredentials();
});
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();