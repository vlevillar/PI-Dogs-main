import React from "react";
import "./LoadingStyle.css";
import loading from "../../assets/Loading.gif"

export default function Loading(){
    return(
        <div className="paginado">
             <h1 className="title4">Loading Dogs...</h1>
            <img className="imagenLoading" src= {loading} alt="gif not found!"/>
        </div>
    )
}