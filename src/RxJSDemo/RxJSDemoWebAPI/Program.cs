using AMSWebAPI;
using NetCore2BlocklyNew;
using RxJSData;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<Lists>();
var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseBlocklyUI(app.Environment);

}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(it => it.SetIsOriginAllowed(a => true).AllowAnyHeader().AllowAnyMethod().AllowCredentials());
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("rxjsAng/{*path:nonfile}", "/rxjsAng/index.html");
app.UseAMS();
app.UseBlocklyAutomation();
app.Run();
