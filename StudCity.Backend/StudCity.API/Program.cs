using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StudCity.API.Mapping;
using StudCity.Application.Helpers;
using StudCity.Application.Providers;
using StudCity.Application.Services;
using StudCity.Core.ConfigurationModels;
using StudCity.Core.Interfaces;
using StudCity.Core.Interfaces.Infrastructure;
using StudCity.Core.Interfaces.Providers;
using StudCity.Db.Bridge;
using StudCity.Db.Context;
using StudCity.Infrastructure.Configuration;
using StudCity.Infrastructure.MailSender;

var builder = WebApplication.CreateBuilder(args);

// binding configuration mail client
var mailConfig = new MailSenderConfiguration();
builder.Configuration.GetSection("MailClient").Bind(mailConfig);
builder.Services.AddSingleton(mailConfig);

// Add services to the container.
var jwtConfiguration = new JwtConfiguration();
builder.Configuration.GetSection("Jwt").Bind(jwtConfiguration);
builder.Services.AddControllersWithViews();
builder.Services.AddSingleton(jwtConfiguration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContextFactory<StudCityContext>(
    options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("ApplicationDbConnectionString"),
        b => b.MigrationsAssembly("StudCity.Db")),
    ServiceLifetime.Scoped);
builder.Services.AddSingleton<IPasswordHasher, PasswordHasherService>();
builder.Services.AddScoped<IAuthenticateService, AuthenticateServices>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ITokenProvider, TokenProvider>();
builder.Services.AddScoped<IPinGenerator, PinGenerator>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<IMailClient, MailClient>();
builder.Services.AddScoped<ICryptographer, Base64Cryptographer>();
builder.Services.AddSingleton<ISecurityContext, SecurityContext>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddAutoMapper(typeof(RegistrationCompleteMapperProfile).GetTypeInfo().Assembly);
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http,
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme,
                },
            },
            new List<string>()
        },
    });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateActor = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) &&
                path.StartsWithSegments("/chatRoom"))
            {
                context.Token = accessToken;
            }

            return Task.CompletedTask;
        },
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseSwaggerUI();

app.UseStaticFiles();
app.UseRouting();
app.UseSwagger();
app.UseCors(x =>
{
    x.AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed((origin) => true)
        .AllowCredentials();
});
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.UseHttpsRedirection();

app.Run();
