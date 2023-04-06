import React  from 'react'
import './MovieDisplayer.css'
import { useState,useEffect } from 'react'
import { auth, db } from '../Auth/Firebase';
import { addDoc, collection } from 'firebase/firestore';

function MovieDisplayer() {
    const [trending , setTrending]= useState([]);

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
    
       

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b7c2ef9c68322d155a8651864692f2ea&language=en-US&page=1&include_adult=false`)
        .then((res)=>res.json())
        .then((data)=>{
            if(!data.errors){
                setTrending(data.results)
                
            }else{
                setTrending([]);
                

            }
        })
    

    
        
   
});
  return (
    <div className='landmovies'>
          
          {trending && trending.map((movieItem)=>(
           <div className='movie' key={movieItem.title}>
           <img src={`https://image.tmdb.org/t/p/w200${movieItem.poster_path}`}/>
           <div>
              <h3>{movieItem.title}</h3>
              <p> {movieItem.release_date ? movieItem.release_date.substring(0,4):"-"}</p>
              <div>
              <button className='btnAdd' onClick={()=>sendMovie(movieItem)}>ADD TO MY COLLECTION</button>
              </div>
           </div>
        </div>
        ))}
      </div>
  )
}

export default MovieDisplayer