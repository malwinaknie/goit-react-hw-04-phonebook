import React, { useState, useEffect } from "react";
import ContactForm from "../contact-form/ContactForm";
import Filter from "../filter/Filter";
import ContactList from "../contact-list/ContactList";
import { nanoid } from "nanoid";
import styles from "../app/App.module.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    } else {
      const defaultContacts = [
          { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
          { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
          { id: "id-3", name: "Eden Clements", number: "645-17-79" },
          { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
        ];
        setContacts(defaultContacts);
        localStorage.setItem('contacts', JSON.stringify(defaultContacts));
      }
    }, []);

  const addContact = (name, number) => {
    const contactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (contactExists) {
      alert(`${name} is already in your contacts!`);
      return;
    }

    const id = nanoid();
    const contact = { id, name, number };
    setContacts([...contacts, contact]);
    localStorage.setItem('contacts', JSON.stringify([...contacts, contact]));
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    localStorage.setItem(
      'contacts',
      JSON.stringify(contacts.filter(contact => contact.id !== contactId))
    );
  };

  const handleFilterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    return contacts.filter((contact => contact.name.toLowerCase().includes(filter.toLowerCase())));
  };

  const filteredContacts = getFilteredContacts();

    return (
      <div className={styles["container"]}>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </div>
    );
  }


export default App;
