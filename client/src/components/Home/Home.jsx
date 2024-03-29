import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTemperament,
  getDogs,
  getTemperaments,
  orderByName,
  filterExistingBreed,
  sortWeight,
  filtrosPi
} from "../../redux/actions";
import { Card } from "../Card/Card";
import Pages from "../Pages/Pages";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./HomeStyle.css"

export default function Home() {
  const [, setOrden] = useState("");
  const dispatch = useDispatch();
  const allDog = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((e) => e.temperament);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDog = allDog.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
  };

  function handleSortName(e) {
    if (e.target.value === "all") {
      dispatch(getDogs());
    } else {
      dispatch(orderByName(e.target.value));
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`);
    }
  }

  function handleFilter(e) {
    dispatch(filtrosPi(e.target.value))
    setCurrentPage(1);
  }

  function handleSortWeight(e) {
    if (e.target.value === "All") {
      dispatch(getDogs);
    }else{
    dispatch(sortWeight(e.target.value));
    setCurrentPage(1);
    }
  }

  const handleFilterTemperaments = (e) => {
    if (e.target.value === "All") {
      dispatch(getDogs);
    } else {
      dispatch(filterTemperament(e.target.value));
      setCurrentPage(1);
    }
  };

  const handleFilterExistingBreed = (e) => {
    if (e.target.value === "all") {
        dispatch(getDogs);
    } else {
        dispatch(filterExistingBreed(e.target.value));
        setCurrentPage(1);
    }
  }

  return (
    <div className="home">
      <div className="nav">
        <Link to="/dog">
          <button id="buttonCreate">Create Breed</button>
        </Link>
        <div className="searchbar">
          <SearchBar setCurrentPage={setCurrentPage} />
        </div>
      </div>

      <br />
      <div>
        <button
          className="refresh"
          onClick={(e) => {
            handleClick(e);
            setCurrentPage(1);
          }}
        >
          Refresh Dogs
        </button>
      </div>

      <select
        className="filter"
        onChange={(e) => {
          handleSortName(e);
        }}
      >
        <option value="all">Alphabetically</option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>

      <select className="filter" onChange={(e) => {handleSortWeight(e)}}>
        <option value="All">By weight</option>
        <option value="small">Light</option>
        <option value="big">Heavy</option>
      </select>

      <select className="filter" onChange={(e) => {handleFilter(e)}}>
        <option value="All">By weight</option>
        <option> Pi </option>
      </select>

      <select className="filter" onChange={(e) => handleFilterTemperaments(e)}>
        <option value="All">All temperaments</option>
        {allTemperaments &&
          allTemperaments.map((e) => (
            <option key={e.id} value={e.name}>
              {" "}
              {e.name}{" "}
            </option>
          ))}
      </select>

      <select className="filter" onChange={(e) => {handleFilterExistingBreed(e)}}>
        <option value="all">All existing breed</option>
        <option value="db" >Existing breed in DB</option>
        <option value="api" >Existing breed in API</option>
      </select>
      
      <div className="cards">
        {currentDog?.map((e) => {
          return (
            <div key={e.id}>
              <Card
                id={e.id}
                name={e.name}
                image={e.image}
                temperament={e.temperament}
                weight={e.weight + " Lb"}
              />
            </div>
          );
        })}
      </div>
      <Pages
        dogsPerPage={dogsPerPage}
        allDog={allDog.length}
        paginado={paginado}
      />
    </div>
  );
}
