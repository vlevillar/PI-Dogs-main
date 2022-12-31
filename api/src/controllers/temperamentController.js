const axios = require("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

const getAllTemperaments = async(req, res) => {
    const temperamentsInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
   
    const temperamentsBd = temperamentsInfo.data.map((e) => e.temperament)//muchos arrelos
    .toString()//Devuelve una cadena de caracteres (texto)
    .trim()// eliminar espacios en blanco y tablulaciones
    .split(/\s*,\s*/);//Esto imprime dos líneas; la primera línea imprime la cadena original, y la segunda línea imprime el array resultante.
    
    const filtrado = temperamentsBd.filter(e => e);
    const filtradoEach =[... new Set (filtrado)];
    filtradoEach.forEach(e =>{
       Temperament.findOrCreate({// se fija si esta y si no esta lo crea 
          where: {name: e},
       })
    })
    const todosTemperaments =await Temperament.findAll();
    res.json(todosTemperaments); 
}

module.exports = { getAllTemperaments }