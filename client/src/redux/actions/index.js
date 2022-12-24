import axios from "axios";
export function getDogs() {
    return async function (dispatch) {
        let json = await axios("http://localhost:3001/dogs");
        return dispatch({
            type: "GET_DOGS",
            payload: json.data,
        });
    };
}

export function getDogName(name) {
    return async function (dispatch) {
        let json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: "GET_DOG-NAME",
            payload: json.data,
        });
    };
}