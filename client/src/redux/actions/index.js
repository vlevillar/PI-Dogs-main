import axios from "axios";

export function getDogs() {
    return async function (dispatch) {
        let json = await axios("https://pi-dogs-main-production-f849.up.railway.app/dogs");
        return dispatch({
            type: "GET_DOGS",
            payload: json.data,
        });
    };
}

export function getTemperaments(){
    return async function (dispatch){
        let json = await axios("https://pi-dogs-main-production-f849.up.railway.app/temperament");
        return dispatch({
            type:"GET_TEMPERAMENTS",
            payload: json.data,
        });
    };
}

export function getDogName(name) {
    return async function (dispatch) {
        let json = await axios.get(`https://pi-dogs-main-production-f849.up.railway.app/dogs?name=${name}`);
        return dispatch({
            type: "GET_DOG-NAME",
            payload: json.data,
        });
    };
}

export function getDetail(id){
    return async function(dispatch){
        const json = await axios.get('https://pi-dogs-main-production-f849.up.railway.app/dogs/'+id)
        return dispatch({
            type:"GET_DETAIL",
            payload: json.data,
        })
    }
}  

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload,
    };
}

export function filterTemperament(payload){
    return {
        type: "FILTER_TEMPERAMENT",
        payload,
    };
}

export function filterExistingBreed(payload){
    return {
        type:"FILTER_EXISTING_BREED",
        payload,
    };
}

export function sortWeight(payload){
    return {
        type: "SORT_WEIGHT",
        payload,
    }
}

export function postDogs(payload){
    return async function(){
        const create = await axios.post('https://pi-dogs-main-production-f849.up.railway.app/dog',payload);
        return create;
    }
}


export function filtrosPi(payload){
    return{
        type: "SORT_WEIGHT_PI",
        payload,
    }
}

export function resState(){
    return {
        type: "RES_STATE",
    }
}