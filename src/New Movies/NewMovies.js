import React from 'react'
import './NewMovies.css'
import { useState,useEffect } from 'react';
import { auth, db } from '../Auth/Firebase';
import { addDoc, collection } from 'firebase/firestore';


function NewMovies() {
    const [newMovies , setNewMovies]= useState([]);

    const sendMovie=async(movieItem)=>{
      const {uid}=auth.currentUser
      await addDoc(collection(db,'MyCollection'),{
         name:movieItem.title,
         image:movieItem.poster_path,
         year:movieItem.release_date,
        
         uid
      })
    }

    useEffect(()=>{
    
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=b7c2ef9c68322d155a8651864692f2ea&language=en-US&page=1&include_adult=false`)
        .then((res)=>res.json())
        .then((data)=>{
            if(!data.errors){
                setNewMovies(data.results)
                
            }else{
                setNewMovies([]);
                

            }
        })  
});


  return (
    <div id='New Movies' className='newMovieContainer'>

     <div className='SubNav'>
       <h1>New Movies</h1>
     
    </div>

  
    
    <div className='Newmovies'>
           
        {newMovies && newMovies.map((movieItem)=>(
           <div className='movie'key={movieItem.title}>
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
    </div>
  )
}

export default NewMovies