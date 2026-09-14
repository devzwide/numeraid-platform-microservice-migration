FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["numeraid-iam-service.slnx", "."]
COPY ["api/api.csproj", "api/"]
COPY ["infrastructure/infrastructure.csproj", "infrastructure/"]
RUN dotnet restore "api/api.csproj"

COPY . .
WORKDIR "/src/api"
RUN dotnet publish "api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "api.dll"]