import React, { useEffect, useState } from "react";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import axios from "axios";
import Card from "./Card";
import Form from "./Form";

const MySwal = withReactContent(Swal)


const WeatherPanel = () => {
  let urlWeather =
    "https://api.openweathermap.org/data/2.5/weather?appid=0a173a97bd9e885754c73cc4282e76f4&lang=es&units=metric";
  let cityUrl = "&q=";
  let urlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?appid=0a173a97bd9e885754c73cc4282e76f4&lang=es&units=metric";

  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const getLocation = async (loc) => {
    setLoading(true);
    setLocation(loc);

    //weather
    urlWeather = urlWeather + cityUrl + loc;

    await fetch(urlWeather)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((weatherData) => {
        setWeather(weatherData);
      })
      .catch((error) => {
        setLoading(false);
        setShow(false);
      });

    //Forecast

    urlForecast = urlForecast + cityUrl + loc;

    await fetch(urlForecast)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((forecastData) => {
        console.log(forecastData);
        setForecast(forecastData);
        setLoading(false);
        setShow(true);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.status === 404 ? 'No fue posible encontrar esta ciudad' : error.response.statusText,
        })
        setLoading(false);
        setShow(false);
      });
  };
  useEffect(() => {
    getUbicacion();
  }, []);

  //Creamos la funcion para el botón 'Buscar mi ubicación'
  const getUbicacion = () => {
    //Si el Navegador soporta Geolocalización HTML5 que proceda y si no enviamos una alerta
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=0a173a97bd9e885754c73cc4282e76f4&units=metric&lang=es`
          )
          .then((response) => {
            if (response.status === 200) {
              setWeather(response.data);
            }
          });
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=0a173a97bd9e885754c73cc4282e76f4&units=metric&lang=es`
          )
          .then((response) => {
            if (response.status === 200) {
              setForecast(response.data);
              setLoading(false);
              setShow(true);
            }
          });
      });
    } else {
      alert("Tu Navegador no soporta Geolocalización, por favor actualizalo!");
    }
  };

  return (
    <React.Fragment>
      <Form newLocation={getLocation} />
      <Card
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </React.Fragment>
  );
};

export default WeatherPanel;
