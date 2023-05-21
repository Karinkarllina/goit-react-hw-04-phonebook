import { useState } from 'react';
import contactsData from './contacts.json'
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import { useLocalStorage } from 'hooks/useLocalStorage'; 
import css from './App.module.css'


export function App() {

  const [contacts, setContacts] = useLocalStorage('contacts', contactsData);
  const [filter, setFilter] = useState('');
  

  const addContact = ({ name, number }) => {
    
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    const filterName = setFilter.filter(contact => contact.name.toLowerCase() === newContact.name.toLowerCase()).length;
    
    if(filterName) {
      return alert(`${newContact.name} is already in contacts`)
    } else {
          setContacts(contacts => ({
          contacts: [newContact, ...contacts],
          }));
      }
  }


   const changeFilter = event => {
    setFilter(event.currentTarget.value.toLowerCase());
  };


  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return {
        contacts: prevContacts.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };


  const visibleContact = contacts.filter(contact => contact.name.toLowerCase().includes(filter))
  

  return (
    <div className={css.phonebookWrap}>
      <h1 className={css.maineTitle}>Phonebook</h1>
      <ContactForm onSubmit={addContact}/>
      <h2 className={css.sectionTitle}>Contacts</h2>
      <Filter
        value={filter}
        onChange={changeFilter}
      />
      <ContactList
        contacts={visibleContact}
        onDelete={deleteContact}
        />
    </div>
  );
}


