import React ,{useState,useEffect}from 'react'
import './History.css'
import { collection, onSnapshot, query, where, getDocs ,addDoc,deleteDoc,doc } from 'firebase/firestore';
import { db,auth } from '../Auth/Firebase';
import { async } from '@firebase/util';

function History() {
  const [watchedMovies,setWatchedMovies] = useState([]);

  const deleteMovie=async(movieItem)=>{
    
    await deleteDoc(doc(db, "Watched",movieItem.id));

  }
   
  
         
    const getmovie=async()=>{
      const {uid}=auth.currentUser
      const q = query(collection(db, "Watched"), where("uid", "==", uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const moreWatched = [];
        querySnapshot.forEach((doc) => {
          moreWatched.push({...doc.data(),id:doc.id});
        });
        setWatchedMovies(moreWatched);
      });
   }
  
   useEffect(()=>{
    getmovie();
},)
  return (
    <div id='History'>
       <div className='SubNav'>
       <h1>History</h1>
     
    </div>

      <div className='landmovies'>
           
        {watchedMovies && watchedMovies.map((movieItem)=>(
           <div className='movie'key={movieItem.id}>
           <img src={`https://image.tmdb.org/t/p/w200${movieItem.image}`}/>
           <div>
              <h3>{movieItem.name}</h3>
              <p> {movieItem.year ? movieItem.year.substring(0,4):"-"}</p>
             
              <button className='btnAdd' onClick={()=>deleteMovie(movieItem)}>Delete</button>
           </div>
        </div>
        ))}

      </div>
      </div>
  )
}

export default History