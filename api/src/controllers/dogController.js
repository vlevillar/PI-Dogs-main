const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;


const getApiInfo = async () => {
    const {data} = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}');
    if (!data) throw new Error ("Error! status ${data.status}");
    const dogsApi = data.map( e => ({
        id: e.id,
        name: e.name,
        height: e.height.imperial,
        weight: e.weight.imperial,
        life_span: e.life_span,
        image: e.image.url,
        temperament: e.temperament,
        home_grown_data: false,
        bred_for: e.bred_for
    }));
    return dogsApi;
}

const getDbInfo = async () => {
return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        //
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
    let ApiInfo = await getApiInfo();
    let DbInfo = await getDbInfo();
    let allDogs = ApiInfo.concat(DbInfo);
    return allDogs;
}

const getAllDogsOrByQuery = async (req, res) => {
    const name = req.query.name;
    const allBreeds = await getAllDogs();
    if (name) {
        const dogName = await allBreeds.filter(e => e.name?.toLowerCase().includes(name.toLowerCase()));
        dogName.length ? res.status(200).send(dogName) : res.status(404).send("Dog not found");
    }else{
        res.status(200).send(allBreeds);
    }
}

const getDogsById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const dogsTotales= await getAllDogs()
        
        const dog = dogsTotales.find(ele => ele.id == id);

        if(!dog){
            res.status(404).send("No esta disponible");
        } else {
            res.status(200).send(dog);
        }
    } catch (error) {
        next(error);
    }
}

const createDog = async (req, res) => {
    const {
        name,
        height,
        weight,
        life_span,
        temperament,
        image,
      } = req.body;
    
      const createDog = await Dog.create({
        name:name,
        height: height,
        weight: weight,
        life_span: life_span,
        image: image,
        temperament: temperament,
        
      });
     if(createDog){
    res.status(200).json(createDog);
     }else{
       res.status(500).send('uncreated dog')
     }
}

module.exports = { getAllDogsOrByQuery,getDogsById, createDog }