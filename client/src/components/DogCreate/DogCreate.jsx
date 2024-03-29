import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, resState, postDogs } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import "./DogCreate.css"
import { validation } from "./ErrorsCreate";

export default function DogCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments= useSelector((e) => e.temperament);

    const [input, setInput] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minlife_span: "",
        maxlife_span: "",
        image: "",
        temperament: [],
        createdInBd: false,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch (getTemperaments());
        dispatch(resState(resState));
    }, [dispatch]);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validation(input));
        const errorCompletarFormu = validation(input);
        if (Object.values(errorCompletarFormu).length !== 0 || !input.temperament) {
          alert("All the fields are required");
        } else {
          let crear = {
            name: input.name,
            height: `${input.minHeight} - ${input.maxHeight}`,
            weight: `${input.minWeight} - ${input.maxWeight}`,
            life_span: `${input.minlife_span} - ${input.maxlife_span} years`,
            image: input.image,
            temperament: input.temperament.join(", "),
          };
          dispatch(postDogs(crear));
          alert('Dog Created!')
          setInput({
            name: "",
            minHeight: "",
            maxHeight: "",
            minWeight: "",
            maxWeight: "",
            minlife_span: "",
            maxlife_span: "",
            image: "",
            temperament: [],
            createdInBd: true,
          });
          history.push("/home")
      }}
      function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
        setErrors(
          validation({
            ...input,
              [e.target.name]: e.target.value,
          })
        )
      }
    
      function handleSelectTemperament(e) {
      if(!input.temperament.includes(e.target.value)){
      
        setInput({
          ...input,
          temperament: [...input.temperament, e.target.value],
        });
      } 
       
      }
      function handleDelete(e) {
      
        e.preventDefault();
           setInput({
          ...input,
          temperament: input.temperament.filter((temp) => temp !== e.target.innerText),
          
        });
      }
    
      return (
        <div className="fromPerfil">
          <div >
            <div>
              
              <Link to="/home">
                <button className="boton5">
                  Home
                </button>
              </Link>
              <h1 className="titleForm">Create Dog</h1>
            </div>
            <div className="">
              <form className="fromPerfil" onSubmit={resState}>
              
                <div className="">
                  <label className="title5">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => handleChange(e)}
                  /><br/><strong>{errors.name}</strong>
    
                  <label className="title5">Height min:</label>
                  <input
                    type="number"
                    name="minHeight"
                    value={input.minHeight}
                    onChange={(e) => handleChange(e)}
                  /><br/><strong>{errors.minHeight}</strong>
    
                  <label className="title5">Height max:</label>
                  <input
                    type="number"
                    name="maxHeight"
                    value={input.maxHeight}
                    onChange={(e) => handleChange(e)}
                  /><br/><strong>{errors.maxHeight}</strong>
    
                  <label className="title5">Weight min:</label>
                  <input
                    type="number"
                    name="minWeight"
                    value={input.minWeight}
                    onChange={(e) => handleChange(e)}
                  /><br/><strong>{errors.minWeight}</strong>
    
                  <label className="title5">Weight max:</label>
                  <input
                    type="number"
                    name="maxWeight"
                    value={input.maxWeight}
                    onChange={(e) => handleChange(e)}
                  ></input><br/><strong>{errors.maxWeight}</strong>
    
                  <label className="title5">Life span min:</label>
                  <input
                    type="number"
                    name="minlife_span"
                    value={input.minlife_span}
                    onChange={(e) => handleChange(e)}
                  /><br/><strong>{errors.minlife_span}</strong>
    
                  <label className="title5">Life span max:</label>
                  <input
                    type="number"
                    name="maxlife_span"
                    value={input.maxlife_span}
                    onChange={(e) => handleChange(e)}
                  /><br/><strong>{errors.maxlife_span}</strong>
    
                  <label name="image" className="title5">
                    Image:
                  </label>
                  <input
                    name="image"
                    value={input.image}
                    placeholder='URL'
                    onChange={(e) => handleChange(e)}
                  ></input>
    
                  <label className="title5" value="temperament" name="temperament">
                    {" "}
                    Temperament:{" "}
                  </label>
                  <select
                    className="boton5"
                    onChange={(e) => handleSelectTemperament(e)}
                  >
                    <option>Temperaments</option>
                    {allTemperaments &&
                      allTemperaments.map((e) => (
                        <option key={e.id} value={e.name}>
                          {e.name}
                        </option>
                      ))}
                  </select><br/>
    
                  {input.temperament.map((nombre) => {
                    return (
                      <div className="concatFiltro">
                      <span key={nombre}>
                       
                        <button className="boton3" onClick={(nombre)=> handleDelete(nombre)}>
                          {nombre} 
                        </button>
                      </span>
                      </div>
                    );  
                  })}   
                  
                  <button
                    className="boton5"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  > Create new Dog
                  </button>
    
                </div>
              </form>
            </div>
          </div>
          <div className="img">
            <img src="https://64.media.tumblr.com/d26b86f59e41e57ecb6d053e93dee97e/tumblr_o0hav8YTDN1uzrrkro1_1280.gif" alt="perfil" />
          </div>
        </div>
      );
}