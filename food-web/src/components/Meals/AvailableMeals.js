import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useState, useEffect } from 'react';
// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 12.99,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 16.40,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals=()=>{
  const [meals, setMeals] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const[httpError, setHttpError] = useState(false);
  useEffect(()=>{    const fetchMeals = async ()=>{
    setIsLoading(true);
    const response = await fetch('https://react-app-1cebe-default-rtdb.firebaseio.com/meals.json')
    console.log(response,"fgggg")

    if(!response.ok){
      throw new Error('Something went wrong!!');
    }
  const responseData = await response.json();

  const loadedMeals = [];

  for (const key in responseData){
    loadedMeals.push({
      id: key,
      name: responseData[key].name,
      description: responseData[key].description,
      price: responseData[key].price
    })
  }
  setMeals(loadedMeals);
  setIsLoading(false);
  };

  try{
    fetchMeals().catch();
  }
  catch(error){
setIsLoading(false)
setHttpError(error.message)
 }
},[]);

if(isLoading){
  return <section classes = {classes.MealsLoading}>
    <p>Loading...</p>
  </section>
}
if(httpError){
return(
  <section className={classes.mealsError} >
    <p>{httpError}</p>
  </section>
)
}
  const mealsList = meals.map(meal=>(
  <MealItem 
  id  = {meal.id}
  key={meal.id} 
  name = {meal.name} 
  description = {meal.description} 
  price = { meal.price}
  />
  ));
  return(
  <section className={classes.meals}>
    <Card><ul>
      {mealsList}
    </ul></Card>
  </section>
  )}
export default AvailableMeals;