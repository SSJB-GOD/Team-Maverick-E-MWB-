import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageContacts.css";

function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(savedContacts);
  }, []);

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    if (newPhone.length > 10) {
      setPhoneError("Invalid phone number: Phone number must not exceed 10 digits.");
    } else if (/^\d{0,10}$/.test(newPhone)) {
      setContactPhone(newPhone);
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number: Phone number must only contain digits.");
    }
  };

  const saveContact = () => {
    if (!phoneError && contactPhone.length === 10) {
      const newContacts = [...contacts];

      if (editIndex !== null) {
        newContacts[editIndex] = { name: contactName, phone: contactPhone };
        setEditIndex(null);
      } else {
        newContacts.push({ name: contactName, phone: contactPhone });
      }

      setContacts(newContacts);
      localStorage.setItem("contacts", JSON.stringify(newContacts));
      setContactName("");
      setContactPhone("");
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };

  const editContact = (index) => {
    const contact = contacts[index];
    setContactName(contact.name);
    setContactPhone(contact.phone);
    setEditIndex(index);
  };

  const removeContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  const goBack = () => {
    navigate(-1);
  };

  const shareLocation = () => {
    if (selectedContactIndex === null) {
      alert("Please select a contact to share your location.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const contact = contacts[selectedContactIndex];
        console.log(`Location sent to ${contact.name}: ${locationLink}`);
        setMessageSent(true);
        setTimeout(() => setMessageSent(false), 3000);
      },
      (error) => {
        alert("Error fetching location: " + error.message);
      }
    );
  };

  return (
    <div className="container">
      <h2>Manage Contacts</h2>
      <input
        type="text"
        placeholder="Enter contact name"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter contact phone number"
        value={contactPhone}
        onChange={handlePhoneChange}
        maxLength={10}
      />
      {phoneError && <p className="error-message">{phoneError}</p>}
      <button onClick={saveContact}>
        {editIndex !== null ? "Update Contact" : "Save Contact"}
      </button>

      <h3>Saved Contacts</h3>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <span>{contact.name} - {contact.phone}</span>
            <button onClick={() => editContact(index)} className="edit-button">Edit</button>
            <button onClick={() => removeContact(index)} className="delete-button">Remove</button>
            <input
              type="radio"
              name="selectedContact"
              onChange={() => setSelectedContactIndex(index)}
              checked={selectedContactIndex === index}
            />
          </li>
        ))}
      </ul>

      <button onClick={shareLocation} className="share-button">Share Location</button>
      {messageSent && (
        <div className="message-sent">
          <p>Message shared successfully!</p>
          <div className="tick-mark">✔</div>
        </div>
      )}

      <button onClick={goBack} className="back-button">Back</button>
    </div>
  );
}

export default ManageContacts;
