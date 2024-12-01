import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmergencyApp.css";

function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();
  // alert(location.pathname);
  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch contacts from the server
  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/location/contacts"
      );
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Handle email change with validation
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setContactEmail(newEmail);

    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  };

  const saveContact = async () => {
    if (!emailError && contactEmail) {
      if (editIndex !== null) {
        const contactToUpdate = contacts[editIndex];
        try {
          const response = await axios.put(
            `http://localhost:8081/api/location/contacts/${contactToUpdate.id}`,
            {
              name: contactName,
              email: contactEmail,
            }
          );
          setContacts((prev) =>
            prev.map((c, i) => (i === editIndex ? response.data : c))
          );
          setEditIndex(null);
        } catch (error) {
          console.error("Error updating contact:", error);
        }
      } else {
        try {
          const response = await axios.post(
            "http://localhost:8081/api/location/contacts/save",
            {
              name: contactName,
              email: contactEmail,
            }
          );
          setContacts([...contacts, response.data]);
        } catch (error) {
          console.error("Error saving contact:", error);
        }
      }
      setContactName("");
      setContactEmail("");
    } else {
      alert("Please enter a valid email.");
    }
  };

  // Edit a contact
  const editContact = (index) => {
    const contact = contacts[index];
    setContactName(contact.name);
    setContactEmail(contact.email);
    setEditIndex(index);
  };

  // Remove a contact
  const removeContact = async (index) => {
    const contactToDelete = contacts[index];
    try {
      await axios.delete(
        `http://localhost:8081/api/location/contacts/${contactToDelete.id}`
      );
      setContacts(contacts.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const goBack = () => {
    navigate("/LocationSender");
  };

  return (
    <div className="sos_container">
      <div className="container" style={{ marginTop: "20px" }}>
        <h2>Manage Contacts</h2>
        <input
          type="text"
          placeholder="Enter contact name"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter contact email"
          value={contactEmail}
          onChange={handleEmailChange}
        />
        {emailError && <p className="error-message">{emailError}</p>}
        <button onClick={saveContact}>
          {editIndex !== null ? "Update Contact" : "Save Contact"}
        </button>

        <h3>Saved Contacts</h3>
        <ul className="save-contact">
          {contacts.map((contact, index) => (
            <li key={index} className="contact-item">
              {/* <span> */}
              {contact.name} - {contact.email}
              {/* </span> */}
              <button
                onClick={() => editContact(index)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => removeContact(index)}
                className="delete-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={goBack}
          className="back-button"
          style={{ color: "white" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ManageContacts;
