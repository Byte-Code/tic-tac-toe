import {firebaseDB} from './firebaseService'
import fetch from 'cross-fetch'

export async function newMatch(props){    
    
    const val = await fetch(firebaseDB.ref('Matches').on('value',(snapshot) => {
        console.log(snapshot)
        }))
                /*.then(
                    response => {
                        console.log('num Matches ',response);
                        if(response.ok){                            
                            return response                                
                        }                                            
                    },
                    error => console.log('Error - ', error)
                )
                .then(
                    numMatches => numMatches
                )
                .catch(
                    err => 0                     
                )
    

    console.log('Valore da usare concatenare al nameMatch ',val);      
        
    fetch(firebaseDB.ref("Matches/Match_"+val).set({
        1:"",
        2:"",
        3:"",
        4:"",
        5:"",
        6:"",
        7:"",
        8:"",
        9:""      
    })
    )
    .then(
        response => console.log('sendX ',response),                                        
        error => console.log('Error - initialize Match', error)
    )  */ 
}