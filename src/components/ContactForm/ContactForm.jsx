import { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export function ContactForm({onSubmit}) { 

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


    // const getFormValue = event => {
    //     const { name, value } = event.currentTarget;

    //     this.setState({ [name]: value })  
    // }
    
    const getNameValue = event => { 
        setName(event.currentTarget.value)
    }


    const getNumberValue = event => { 
        setNumber(event.currentTarget.value)
    }
    

    const reset = () => {
        setName('');
        setNumber('');
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({name, number});
        reset();
    };
  
    
    return (
        <form onSubmit={handleSubmit} className={css.formMaine}>
            <label className={css.formMaineLabel}>
                Name
                <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                onChange={getNameValue}
                className={css.inputMaine}
                />
            </label>
            <label className={css.formMaineLabel}>
                Number
                <input
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={getNumberValue}
                className={css.inputMaine}
                />
            </label>
          <button type='submit'className={css.formAddBtn}> Add Contact </button>
        </form>
    )
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

