import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDogs } from "../../redux/actions";
import { Card } from "../Card/Card";

export default function Home (){
    const dispatch = useDispatch();
    const allDog = useSelector(state => state.dogs);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(6);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDog = allDog.slice(indexOfFirstDog, indexOfLastDog);

    useEffect(()=>{
        dispatch(getDogs());
    }, [dispatch]);

    return(
        <div className="home">
            <div className="cards">
                {currentDog?.map(e => {
                    return (
                        <div key={e.id}>
                            <Card
                            id={e.id}
                            name={e.name}
                            image_url={e.image_url}
                            bred_for={e.bred_for}
                            />
                        </div>    
                    )
                })}
            </div>

        </div>
    )
}
