using card_game_server.Data;
using card_game_server.Logic;
using card_game_server.Models.DTO_Models;
using card_game_server.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<SimpleData>();
builder.Services.AddSingleton<GameData>();
builder.Services.AddSingleton<IDeckLogic,DeckLogic>();
builder.Services.AddSingleton<IPlayersLogic,PlayersLogic>();
builder.Services.AddSingleton<IGameLogic,GameLogic>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder
        .SetIsOriginAllowed(origin => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
