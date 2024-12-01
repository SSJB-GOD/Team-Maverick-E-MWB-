package com.infosys.User.services;


import com.infosys.User.dto.LoginDto;
import com.infosys.User.dto.RegisterDto;
import com.infosys.User.dto.UpdateDto;
import com.infosys.User.models.Person;
import com.infosys.User.repositories.PersonRepository;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class PersonService implements UserDetailsService {

    @Autowired
    private PersonRepository personRepository;

    @Value("${security.jwt.secret-key}")
    private String jwtSecretKey;

    @Value("${security.jwt.issuer}")
    private String jwtIssuer;

    private final BCryptPasswordEncoder bCryptEncoder = new BCryptPasswordEncoder();

    // Registration logic
    public Map<String, Object> registerUser(RegisterDto registerDto) {
        var response = new HashMap<String, Object>();
        // Check if username or email exists
        if (personRepository.findByUsername(registerDto.getUsername()).isPresent()) {
            response.put("error", "Username already exists");
            return response;
        }
        if (personRepository.findByEmail(registerDto.getEmail()).isPresent()) {
            response.put("error", "Email already exists");
            return response;
        }
        // Encrypt password and save user
        Person person = new Person();
        person.setFirstname(registerDto.getFirstname());
        person.setLastname(registerDto.getLastname());
        person.setUsername(registerDto.getUsername());
        person.setEmail(registerDto.getEmail());
        person.setCreatedAt(new Date());
        person.setPassword(bCryptEncoder.encode(registerDto.getPassword()));
        personRepository.save(person);

        response.put("token", createJwtToken(person));
        response.put("user", person);
        return response;
    }


    public Map<String, Object> authenticateUser(LoginDto loginDto) {
        Optional<Person> personOptional = personRepository.findByEmail(loginDto.getEmail());
        var response = new HashMap<String, Object>();

        if (personOptional.isPresent()) {
            Person person = personOptional.get();
            if (bCryptEncoder.matches(loginDto.getPassword(), person.getPassword())) {
                response.put("token", createJwtToken(person));
                response.put("user", person);
                return response;
            }
        }
        response.put("error", "Email or password is incorrect");
        return response;
    }



    public Map<String, Object> updateUser(String username, UpdateDto updateDto) {
        var response = new HashMap<String, Object>();

        Optional<Person> personOptional = personRepository.findByUsername(username);
        if (personOptional.isEmpty()) {
            response.put("error", "User not found");
            return response;
        }

        Person person = personOptional.get();

        // Update details
        if (updateDto.getFirstname() != null) {
            person.setFirstname(updateDto.getFirstname());
        }
        if (updateDto.getLastname() != null) {
            person.setLastname(updateDto.getLastname());
        }
        if (updateDto.getEmail() != null && !updateDto.getEmail().equals(person.getEmail())) {
            if (personRepository.findByEmail(updateDto.getEmail()).isPresent()) {
                response.put("error", "Email already in use");
                return response;
            }
            person.setEmail(updateDto.getEmail());
        }
        if (updateDto.getPassword() != null) {
            person.setPassword(bCryptEncoder.encode(updateDto.getPassword()));
        }

        personRepository.save(person);
        response.put("message", "User updated successfully");
        response.put("user", person);
        return response;
    }




    // JWT creation logic
    private String createJwtToken(Person person) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(jwtIssuer)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(24 * 3600))  // 1 day expiration
                .subject(person.getUsername())
                .build();

        var encoder = new NimbusJwtEncoder(new ImmutableSecret<>(jwtSecretKey.getBytes()));
        var params = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims);
        return encoder.encode(params).getTokenValue();
    }

    // loadUserByUsername (existing method)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findByUsername(username)
                .map(person -> User.withUsername(person.getUsername())
                        .password(person.getPassword())
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
