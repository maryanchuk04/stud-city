using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StudCity.API.Extensions;
using StudCity.API.Hubs;
using StudCity.API.Mapping;
using StudCity.API.Policies;
using StudCity.Application.CommandHandlers.Authenticate;
using StudCity.Application.Helpers;
using StudCity.Application.Providers;
using StudCity.Application.Services;
using StudCity.Core.ConfigurationModels;
using StudCity.Core.Interfaces;
using StudCity.Core.Interfaces.Infrastructure;
using StudCity.Core.Interfaces.Providers;
using StudCity.Db.Bridge;
using StudCity.Db.Context;
using StudCity.Db.DbInitialize;
using StudCity.Infrastructure.Configuration;
using StudCity.Infrastructure.MailSender;

var builder = WebApplication.CreateBuilder(args);

// Configure db context
builder.Services.AddDbContextFactory<StudCityContext>(
options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("ApplicationDbConnectionString"),
    b => b.MigrationsAssembly("StudCity.Db")),
ServiceLifetime.Scoped);

// binding configuration mail client
var mailConfig = new MailSenderConfiguration();
builder.Configuration.GetSection("MailClient").Bind(mailConfig);
builder.Services.AddSingleton(mailConfig);
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
var appConfig = new AppConfigurationModel();
builder.Configuration.GetSection("AppPath").Bind(appConfig);
builder.Services.AddSingleton(appConfig);

// Add Logging.
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Jwt configuration.
var jwtConfiguration = new JwtConfiguration();
builder.Configuration.GetSection("Jwt").Bind(jwtConfiguration);
builder.Services.AddSingleton(jwtConfiguration);

// Add services to the container.
builder.ConfigureValidation();
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssemblyContaining<GoogleAuthenticateCommand>());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<IPasswordHasher, PasswordHasherService>();
builder.Services.AddScoped<IAuthenticateService, AuthenticateServices>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ITokenProvider, TokenProvider>();
builder.Services.AddScoped<IPinGenerator, PinGenerator>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<IMailClient, MailClient>();
builder.Services.AddScoped<ITeachersStoreService, TeachersStoreService>();
builder.Services.AddScoped<ICryptographer, Base64Cryptographer>();
builder.Services.AddSingleton<ISecurityContext, SecurityContext>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddAutoMapper(typeof(RegistrationCompleteMapperProfile).GetTypeInfo().Assembly);
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddSignalR();
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
                Reference = new OpenApiReference {Id = "Bearer", Type = ReferenceType.SecurityScheme,},
            },
            new List<string>()
        },
    });
});
builder.Services.AddDataProtection().UseCryptographicAlgorithms(
    new AuthenticatedEncryptorConfiguration
    {
        EncryptionAlgorithm = EncryptionAlgorithm.AES_256_CBC, ValidationAlgorithm = ValidationAlgorithm.HMACSHA256,
    });
builder.Services.AddSwaggerGenNewtonsoftSupport();
builder.Services
    .AddMemoryCache()
    .AddAuthorization(options =>
    {
        options.AddPolicy(PolicyNames.AdminPolicyName, policy =>
            policy.Requirements.Add(new RoleRequirement(PolicyNames.AdminRole)));
        options.AddPolicy(PolicyNames.UserPolicyName, policy =>
            policy.Requirements.Add(new RoleRequirement(PolicyNames.UserRole)));
        options.AddPolicy(PolicyNames.StudentPolicyName, policy =>
            policy.Requirements.Add(new RoleRequirement(PolicyNames.StudentRole)));
        options.AddPolicy(PolicyNames.TeacherPolicyName, policy =>
            policy.Requirements.Add(new RoleRequirement(PolicyNames.TeacherRole)));
        options.AddPolicy(PolicyNames.StudentAndTeacherPolicyName, policy =>
            policy.RequireRole(PolicyNames.StudentRole, PolicyNames.TeacherRole));
    })
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
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

                // If the request is for our hub...
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    path.StartsWithSegments("/chatHub"))
                {
                    // Read the token out of the query string
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            },
        };
    });
builder.Services.AddSingleton<IAuthorizationHandler, RoleHandler>();
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseSwaggerUI();
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
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
    endpoints.MapHub<ChatHub>("/chatHub");
    endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var passwordService = services.GetRequiredService<IPasswordHasher>();
        var dbContext = services.GetRequiredService<StudCityContext>();
        dbContext.Database.Migrate();
        DbInitializer.Seed(dbContext, passwordService);
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "An error occurred while seeding the database");
    }
}

app.Run();
