package in.skb.sos_backend.service;

import in.skb.sos_backend.model.Contact;
import in.skb.sos_backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }

    public List<Contact> findAll() {
        return contactRepository.findAll();
    }

    public void deleteById(Long id) {
        contactRepository.deleteById(id);
    }

    public Contact updateContact(Long id, Contact contactDetails) {
        Optional<Contact> optionalContact = contactRepository.findById(id);
        if (optionalContact.isPresent()) {
            Contact existingContact = optionalContact.get();
            existingContact.setName(contactDetails.getName());
            existingContact.setEmail(contactDetails.getEmail());
            return contactRepository.save(existingContact);
        }
        return null;
    }
}
