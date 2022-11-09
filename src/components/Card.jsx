import Spinner from "./Spinner";
import weather_sky from "../assets/img/weather_sky.webp"
const Card = ({loadingData, showData, weather, forecast}) => {
  console.log("forecast", forecast)
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = `${day}/${month}/${year}`
  let iconUrl = ''
  let iconUrl3hrs = ""
  let iconUrl6hrs = ""
  let iconUrl9hrs = ""
  let forecastDate3 = ""
  let forecastDate6 = ""
  let forecastDate9 = ""


  if(loadingData){
    return <Spinner />;
  }

  if(showData) {
    iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    console.log(forecast)
    iconUrl3hrs = `http://openweathermap.org/img/w/${forecast.list[1].weather[0].icon}.png`
    iconUrl6hrs = `http://openweathermap.org/img/w/${forecast.list[2].weather[0].icon}.png`
    iconUrl9hrs = `http://openweathermap.org/img/w/${forecast.list[3].weather[0].icon}.png`
    forecastDate3 = forecast.list[1].dt_txt.substring(8,10) + '/' + forecast.list[1].dt_txt.substring(5,7) + '/' + forecast.list[1].dt_txt.substring(0,4) + ' ' +forecast.list[1].dt_txt.substring(11,13)
    forecastDate6 = forecast.list[2].dt_txt.substring(8,10) + '/' + forecast.list[2].dt_txt.substring(5,7) + '/' + forecast.list[2].dt_txt.substring(0,4) + ' ' +forecast.list[2].dt_txt.substring(11,13)
    forecastDate9 = forecast.list[3].dt_txt.substring(8,10) + '/' + forecast.list[3].dt_txt.substring(5,7) + '/' + forecast.list[3].dt_txt.substring(0,4) + ' ' +forecast.list[3].dt_txt.substring(11,13)

  }

  return (
    <div className="mt-5">
      {
        showData ? (
          <div className="container">
            <div className="card mb-b3 mx-auto bg-dark text-light">
              <div className="row g-0 ">
                <div className="col-md-5">
                  <h3 className="card-title">{weather.name}</h3>
                  <p className="card-date">{date}</p>
                  <h1 className="card-temp">{weather.main.temp}°C</h1>
                  <p className="card-desc"><img src={iconUrl} alt="icon" />{weather.weather[0].description}</p>
                  <img className="img-fluid rounded-start" src={weather_sky} alt="Weather sky"></img>
                </div>
                <div className="col-md-7">
                  <div className="card-body text-start mt-2">
                    <h5 className="card-text">Temperatura máxima: {weather.main.temp_max}°C</h5>
                    <h5 className="card-text">Temperatura minima: {weather.main.temp_min}°C</h5>
                    <h5 className="card-text">Sensación térmica: {weather.main.feels_like}°C</h5>
                    <h5 className="card-text">Humedad: {weather.main.humidity}%</h5>
                    <h5 className="card-text">Velocidad del viento: {weather.wind.speed}m/s</h5>
                  </div>
                  <hr />
                  <div className="row mt-4 w-100 mx-auto px-3">
                    <div className="col-12 col-md-4 bg-secondary py-2 rounded">
                      <p className="">{forecastDate3}h</p>
                      <p className="description "><img src={iconUrl3hrs} alt="icon"/>{forecast.list[1].weather[0].description}</p>
                      <p>{forecast.list[1].main.temp}°C</p>
                    </div>
                    <div className="col-12 col-md-4 py-2 rounded">
                      <p>{forecastDate6}h</p>
                      <p className="description"><img src={iconUrl6hrs} alt="icon"/>{forecast.list[2].weather[0].description}</p>
                      <p>{forecast.list[2].main.temp}°C</p>
                    </div>
                    <div className="col-12 col-md-4 bg-secondary py-2 rounded">
                      <p>{forecastDate9}h</p>
                      <p className="description"><img src={iconUrl9hrs} alt="icon"/>{forecast.list[3].weather[0].description}</p>
                      <p>{forecast.list[3].main.temp}°C</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ): (
          <h2 className="text-light">Sin datos :(</h2>
        )
      }
    </div>
  );
}

export default Card;