using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using StudCity.Db.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region ConfigureServices

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<StudCityContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDbConnectionString"),
        b => b.MigrationsAssembly("StudCity.Db")));

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
        }
        
    });
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

try
{
    var db = app.Services.GetRequiredService<StudCityContext>();
    db.Database.Migrate();
    db.Database.EnsureCreated();
}
catch (Exception e)
{
    Console.WriteLine(e.Message);
}


app.Run();