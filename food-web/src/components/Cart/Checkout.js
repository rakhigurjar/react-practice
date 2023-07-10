import classes from './Checkout.module.css';
import { useRef, useState } from 'react';


const isFiveChars = value => value.trim().length === 5;

const isEmpty = value=> value.trim().length ===  0;
const Checkout = (props) => {
const[formInputValidity, setFormInputValidity] = useState({
  name:true,
  city:true,
  street: true,
  postalCode: true,
});

  const nameInputRef       = useRef();
  const cityInputRef       = useRef();
  const streetInputRef     = useRef();
  const postalCodeInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    
    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    });
    
    const formIsValid = enteredNameIsValid && enteredStreetIsValid &&  enteredPostalCodeIsValid &&  enteredCityIsValid;

    if(!formIsValid){
      return;
    }

    props.onConfirm({
      name:enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
  const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
      {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
      <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
      {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
      {!formInputValidity.postalCode && <p> Please enter a valid postal code!(5 characters long)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
     {!formInputValidity.city && <p> Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;