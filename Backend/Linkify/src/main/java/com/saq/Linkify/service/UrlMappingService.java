package com.saq.Linkify.service;

import com.saq.Linkify.dtos.UrlMappingDTO;
import com.saq.Linkify.model.UrlMapping;
import com.saq.Linkify.model.User;
import com.saq.Linkify.repository.UrlMappingRepository;
import com.saq.Linkify.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@AllArgsConstructor
public class UrlMappingService {

    public UrlMappingRepository urlMappingRepository;
    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        UrlMapping urlMapping = new UrlMapping();
        String shortUrl = generateShortUrl();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setCreatedDate(LocalDateTime.now());
        urlMapping.setUser(user);
        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
       return convertToDTO(savedUrlMapping);
    }

    private String generateShortUrl() {
        String characters = "ABCDEFGHIJKLMNLOPQRSTUVWXYZabcdefghijklmnopqrstvwxyz1234567890";
        StringBuilder shortUrl = new StringBuilder(8);
        Random random = new Random();
        for (int i = 0; i <= 8; i++) {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shortUrl.toString();
    }

    public UrlMappingDTO convertToDTO(UrlMapping urlMapping) {
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        urlMappingDTO.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShortUrl(urlMapping.getShortUrl());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(LocalDateTime.now());
        return urlMappingDTO;
    }
}
