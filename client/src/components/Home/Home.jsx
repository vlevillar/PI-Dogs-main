import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDogs } from "../../redux/actions";

export default function Home (){
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)

    useEffect(()=>{
        dispatch(getDogs());
    }, [dispatch]);

    return(
        <div className="home">
            <div className="cards">
                
            </div>

        </div>
    )
}
