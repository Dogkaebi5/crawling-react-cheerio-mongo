import Rating from './component/Rating';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [ratings, setRarings] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8080/')
    .then(res => {
      setData(res.data.data);
      setRarings(res.data.data[0].ratings);
    })  
  }, [])
  
  if (data.length < 1) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div className='container px-4 mx-auto bg-slate-100'>
        <h2 className='text-base p-4'>기간 : {data[0].date}</h2>
        <ul>
          {ratings.map((rating, index) => <Rating key={index} rank={rating.rank} title={rating.title} broadcast={rating.broadcast} rating={rating.rating} />)}
        </ul>
      </div>
    );
}


}

export default App;
