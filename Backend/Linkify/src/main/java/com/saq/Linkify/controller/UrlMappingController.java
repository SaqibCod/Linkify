package com.saq.Linkify.controller;

import com.saq.Linkify.dtos.UrlMappingDTO;
import com.saq.Linkify.model.User;
import com.saq.Linkify.service.UrlMappingService;
import com.saq.Linkify.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {

    public UrlMappingService urlMappingService;
    public UserService userService;
    @PostMapping("/shortner")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDTO> createShortUrl(@RequestBody Map<String, String> request,
                                                        Principal principal
                                                        ) {
        String originalUrl = request.get("OriginalUrl");
        User user = userService.findByUsername(principal.getName());
        UrlMappingDTO urlMappingDTO = urlMappingService.createShortUrl(originalUrl, user);
        return ResponseEntity.ok(urlMappingDTO);
    }
}
