import React from 'react'
import TextField from "@mui/material/TextField";
import './LandingPage.css'
import { useState ,useEffect} from 'react';
import MovieDisplayer from '../components/MovieDisplayer';
import { auth, db } from '../Auth/Firebase';
import { addDoc, collection } from 'firebase/firestore';



function LandingPage() {
    const [query , setQuery] =useState("");
    const [results , setResults]= useState([]);
    const [display, setDisplay] =useState(false)
     

    
      const sendMovie=async(movieItem)=>{
        const {uid}=auth.currentUser
        
        await addDoc(collection(db,'MyCollection'),{
           name:movieItem.title,
           image:movieItem.poster_path,
           year:movieItem.release_date,
          
           uid
        })
      }
   

    const handleChange=(e)=>{
        e.preventDefault();
        setQuery(e.target.value);
         

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=b7c2ef9c68322d155a8651864692f2ea&language=en-US&page=1&adult=false&query=${e.target.value}`)
        .then((res)=>res.json())
        .then((data)=>{
            if(!data.errors){
                setResults(data.results)
                console.log(data)
                setDisplay(true);
            }
            else{
                setResults([])
                setDisplay(false)
            }
        })
    }
    useEffect(()=>{
        if(query.length===0){
            setDisplay(false);
        }
    },)
    

    
  return (
    <div id='Trending Movies' className='landingContainer'>

     <div className='SubNav'>
       <h1>Trending Movies</h1>
       <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          placeholder='Search for a Movie'
          value={query}
          onChange={handleChange}
         
        />
      </div>
    </div>

    {display ?
    
    <div className='landmovies'>
           
        {results && results.map((movieItem)=>(
           <div className='movie'>
           <img src={`https://image.tmdb.org/t/p/w200${movieItem.poster_path}`}/>
           <div>
              <h3>{movieItem.title}</h3>
              <p> {movieItem.release_date ? movieItem.release_date.substring(0,4):"-"}</p>
              <p>{movieItem.genres}</p>
              <button className='btnAdd' onClick={()=>sendMovie(movieItem)}>ADD TO MY COLLECTION</button>
           </div>
        </div>
        ))}

      </div>
      : <MovieDisplayer />
      
        }
    </div>
  )
}

export default LandingPage