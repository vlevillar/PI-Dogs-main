const initialState = {
    dogs: [],
    allDogs: [],
    temperament: [],
    detail: null
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case "GET_DOGS":
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            };

        case "GET_TEMPERAMENTS":
            return{
                ...state,
                temperament: action.payload,
            };
        
        case "GET_DOG-NAME":
            return{
                ...state,
                dogs: action.payload,          
            };
        
        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload,
            }
            
        case "ORDER_BY_NAME":
            const sortedArr =
                action.payload === "asc"
                    ? state.dogs.sort(function (a, b) {
                        if (a.name > b.name){
                            return 1;
                        }
                        if (b.name > a.name){
                            return -1;
                        }
                        return 0
                    })
                    : state.dogs.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name){
                            return 1;
                        }
                        return 0
                    });    
            return {
                ...state,
                dogs: sortedArr,
            };
        
        case "FILTER_TEMPERAMENT":
            const allBreeds = state.allDogs;
            const filterTemperament = action.payload === "All" ? allBreeds : allBreeds.filter (e => {
                if(e.temperament){
                    if(e.temperament.includes(action.payload)){
                        return e
                    }
                }
            return state[0]
            })
            return {
                ...state,
                dogs: filterTemperament,
            }

        case "FILTER_EXISTING_BREED":         
        if(action.payload === "all"){   
            return { 
                ...state,
                dogs: [...state.allDogs],     
            }
        }else if( action.payload === "db"){
         return { 
            ...state,
             dogs : state.allDogs.filter((breed)=> breed.createdInBd === true),
                }
        }else{
            return { 
                ...state,
                 dogs : state.allDogs.filter((breed)=> breed.createdInBd === undefined),
                }
        }
        
        case "SORT_WEIGHT":
            if( action.payload === 'All'){
                return {
                    ...state,
                    allDogs: [...state.allDogs],
                    dogs: [...state.dogs],
                }
            }
            if( action.payload === 'small'){
                
                return{
                    ...state,
                    
                    allDogs: [...state.allDogs].sort((a, b) =>{
                        let pesoA= parseInt(a.weight.split('-')[0]);
                        let pesoB= parseInt(b.weight.split('-')[0]);
                       
                        if(pesoA > pesoB) return 1;
                        if(pesoA < pesoB) return -1;
                        else return 0;   
                    }),
                    dogs: [...state.dogs].sort((a, b) =>{
                        let pesoA= parseInt(a.weight.split('-')[0]);
                        let pesoB= parseInt(b.weight.split('-')[0]);
                            
                        
                        if(pesoA > pesoB) return 1;
                        if(pesoA < pesoB) return -1;
                        else return 0;
                    })
                }
            }
            
                if( action.payload === 'big'){
                    
                return {

                    ...state,
                    allDogs: [...state.allDogs].sort((a, b) =>{
                        let pesoA= parseInt(a.weight.split('-')[0]);
                        let pesoB= parseInt(b.weight.split('-')[0]);
                           
                        if(pesoA < pesoB) return 1;
                        if(pesoA > pesoB) return -1;
                        else return 0;   
                    }),
                    dogs: [...state.dogs].sort((a, b) =>{
                        let pesoA= parseInt(a.weight.split('-')[0]);
                        let pesoB= parseInt(b.weight.split('-')[0]);

                        if(pesoA < pesoB) return 1;
                        if(pesoA > pesoB) return -1;
                        else return 0;   
                    })
                }
            };
            break;

            case "RES_STATE":
                return{
                    ...state,
                    detail: null
                }

         default:
            return state;
    }
}

export default rootReducer;