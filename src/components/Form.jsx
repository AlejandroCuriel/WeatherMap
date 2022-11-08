import React, { useEffect, useState } from "react";
// import axios from "axios";

const Form = ({ newLocation }) => {
  const [city, setCity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ city });
    if (city === "" || !city) return;

    newLocation(city);
  };

  // minimal configure

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3 mx-auto auto-search-wrappe auto-search-wrapper">
          <input
            id="search"
            type="text"
            className="form-control"
            placeholder="Ciudad"
            onChange={(e) => setCity(e.target.value)}
            autoComplete="off"
          ></input>
          <button className="btn btn-primary input-group-text" type="submit">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
