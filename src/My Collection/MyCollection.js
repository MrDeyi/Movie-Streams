import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import './MyCollection.css'
import { collection, onSnapshot, query, where, getDocs ,addDoc,deleteDoc,doc } from 'firebase/firestore';
import { db,auth } from '../Auth/Firebase';
import { async } from '@firebase/util';
import {useUID} from 'react-uid';
import { Audio,Dna } from 'react-loader-spinner'

function MyCollection() {
   const [movies,setMovies] = useState([]);
   const [loader,setLoader]=useState(true);
   const ident = useUID();
   
     
   const sendMovie=async(movieItem)=>{
      const {uid}=auth.currentUser
      
      await addDoc(collection(db,'Watched'),{
         name:movieItem.name,
         image:movieItem.image,
         year:movieItem.year,
         id:ident,
         uid
      })
      await deleteDoc(doc(db, "MyCollection",movieItem.id));

    }
  
      
      


          const getmovie=async()=>{
            const {uid}=auth.currentUser
            const q = query(collection(db, "MyCollection"), where("uid", "==", uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
               const moreInfo = [];
               querySnapshot.forEach((doc) => {
                  moreInfo.push({...doc.data(),id:doc.id});
               });
               setMovies(moreInfo);
               setLoader(false);
             });
          }
          useEffect(()=>{
         
          getmovie();
      },)
   

  return (
    <div id='My Collection' className='MyCollectionContainer'>
       <div className='SubNav'>
            <h1>My Collection</h1>
          
        </div>

<div className='landmovies'>
           
{loader?  <Dna
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>:<>{movies && movies.map((movieItem)=>(
           <div className='movie'key={movieItem.id}>
           <img src={`https://image.tmdb.org/t/p/w200${movieItem.image}`}/>
           <div>
              <h3>{movieItem.name}</h3>
              <p> {movieItem.year ? movieItem.year.substring(0,4):"-"}</p>
              
              <div className='btnContainer'>
                <button className='btnwatched'onClick={()=>sendMovie(movieItem)}>watched</button>
                 
                </div>
           </div>
        </div>
        ))}
</>}



      
   
         </div>
      </div>
    

    
  )
}

export default MyCollection