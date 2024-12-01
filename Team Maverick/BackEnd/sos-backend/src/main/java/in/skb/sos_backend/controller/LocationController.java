package in.skb.sos_backend.controller;
import in.skb.sos_backend.model.Contact;
import in.skb.sos_backend.model.LocationData;
import in.skb.sos_backend.service.EmailService;
import in.skb.sos_backend.service.ContactService; // New Service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private ContactService contactService; // New Service

    @PostMapping("/share")
    public String shareLocation(@RequestBody LocationData locationData) {
        try {
            System.out.println("Received Location Data: " + locationData.toString());
            List<Contact> contacts = contactService.findAll(); // Get all contacts
            for (Contact contact : contacts) {
                emailService.sendLocationEmail(locationData, contact.getEmail()); // Send email to each contact
            }
            return "Location shared successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to share location. Please try again.";
        }
    }

    @PostMapping("/contacts/save")
    public Contact saveContact(@RequestBody Contact contact) {
        return contactService.save(contact);
    }

    @GetMapping("/contacts")
    public List<Contact> getContacts() {
        return contactService.findAll();
    }

    @DeleteMapping("/contacts/{id}")
    public void deleteContact(@PathVariable Long id) {
        contactService.deleteById(id);
    }

    @PutMapping("/contacts/{id}")
    public Contact updateContact(@PathVariable Long id, @RequestBody Contact contactDetails) {
        return contactService.updateContact(id, contactDetails);
    }
}
