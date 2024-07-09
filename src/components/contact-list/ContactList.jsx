import React from "react";
import PropTypes from 'prop-types';
import styles from './ContactList.module.css'

const ContactList = ({ contacts, deleteContact }) => (
    <ul className={(styles["container"])}>
      {contacts.map(({id, name, number}) => (
        <li 
        key={id}
        className={(styles["list"])}>
        {name + ': ' + number}
        <button 
        className={(styles["button"])}
        type="submit"
        onClick={() => deleteContact(id)}>
          Delete
        </button>
        </li>
      ))}
    </ul>
  );
  
  ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    deleteContact: PropTypes.func.isRequired,
  }

  
  export default ContactList;