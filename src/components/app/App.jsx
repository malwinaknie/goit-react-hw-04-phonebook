import React, { Component } from "react";
import ContactForm from "../contact-form/ContactForm";
import Filter from "../filter/Filter";
import ContactList from "../contact-list/ContactList";
import { nanoid } from "nanoid";
import styles from "../app/App.module.css";

class App extends Component {
constructor() {
  super()
  this.state = {
    contacts: [],
    filter: '',
  }
}

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({contacts: JSON.parse(storedContacts)});
    }
    else {
      this.setState({
        contacts: [
          { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
          { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
          { id: "id-3", name: "Eden Clements", number: "645-17-79" },
          { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
        ],
      })
    }
  }
  //comment for new bug
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contactExists = this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (contactExists) {
      alert(`${name} is already in your contacts!`);
      return;
    }

    const id = nanoid();
    const contact = { id, name, number };
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId),
    }));
  };

  handleFilterChange = (e) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={styles["container"]}>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
