package in.skb.sos_backend.service;

import in.skb.sos_backend.model.LocationData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendLocationEmail(LocationData locationData, String recipientEmail) {
        String subject = "Emergency Location Notification";

        String message = String.format(
                "Emergency Alert!\n\n" +
                        "Phone Number: %s\n" +
                        "Latitude: %s\n" +
                        "Longitude: %s\n" +
                        "Location Name: %s\n" +
                        "Please assist immediately!",
                locationData.getPhoneNumber(),
                locationData.getLatitude(),
                locationData.getLongitude(),
                locationData.getLocationName() != null ? locationData.getLocationName() : "Unknown Location"
        );

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientEmail);
        email.setSubject(subject);
        email.setText(message);
        emailSender.send(email);
    }
}
