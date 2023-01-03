import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, resState } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./DetailStyle.css"
import Loading from "../Loading/Loading";


export default function Detail(){
    const { id }= useParams();
    const dogDetail = useSelector((e)=>e.detail);
    console.log(dogDetail);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getDetail(id));
        dispatch(resState(resState));
    }, [dispatch, id]);

    return (
        <div className="main">
                {dogDetail 
                ?  (
                <main className="paginado2">
                    <div>
                        <div >
                            
                            <img className="imagdetalle" src={dogDetail.image} alt= "no tiene imagen"/>
                        </div>
                    </div>
                    <div className="cardDetalle">
                        <div>
                            <h1>{dogDetail.name}</h1>
                        </div>
                        <div className="base3">
                            <h4>Temperament:</h4>
                            <p>{dogDetail.temperament}</p>
                        </div>
                        <div className="base3">
                            <h4>Height:</h4>
                            <p>{dogDetail.height}</p>
                        </div >
                        <div className="base3">
                            <h4>Weight:</h4>
                            <p>{dogDetail.weight}</p>
                        </div>
                        <div className="base3">
                            <h4>Life Span</h4>
                            <p>{dogDetail.life_span}</p>  
                        </div>
                    </div>
                </main>
                )  :(
              <Loading />
                )}
                <div className="paginado">
                <Link to= "/home">
                <button className="boton4" onClick={resState}>Home</button>
                </Link>
            </div>
        </div>
    )
}