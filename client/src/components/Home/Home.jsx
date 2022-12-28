import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDogs, getTemperaments, orderByName } from "../../redux/actions";
import { Card } from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import { NavLink } from "react-router-dom";

export default function Home (){
    const [, setOrden] = useState("");
    const dispatch = useDispatch();
    const allDog = useSelector(state => state.dogs);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(6);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDog = allDog.slice(indexOfFirstDog, indexOfLastDog);

    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);
  
    const handleClick = e => {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleSort(e) {
        e.preventDefault();
        if (e.target.value === "all") {
            dispatch(getDogs());
        } else {
            dispatch(orderByName(e.target.value));
            setCurrentPage(1);
            setOrden(`Ordenado ${e.target.value}`)
        }
    }

    return(
        <div className="home">
            <div className="nav">
                <NavLink to="/form">
                    <h4>Create Breed</h4>
                </NavLink>
                <div className="searchbar">
                    <SearchBar setCurrentPage={setCurrentPage}/>
                </div>
            </div>

            <br/>
            <div className="filters">
                <button
                onClick={e => {
                  handleClick(e);  
                }}>
                    Refresh Dogs
                </button>
            </div>

            <select onChange={e => {
                handleSort(e)
            }}>
                <option value="all">Order</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>

            <div className="cards">
                {currentDog?.map(e => {
                    return (
                        <div key={e.id}>
                            <Card
                            id={e.id}
                            name={e.name}
                            image_url={e.image_url}
                            temperament={e.temperament}
                            weight={e.weight + " kg"}
                            />
                        </div>    
                    )
                })}
            </div>

        </div>
    )
}
