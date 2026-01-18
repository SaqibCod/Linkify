package com.saq.Linkify.security.jwt;

import com.saq.Linkify.service.UserDetailsImpl;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expiration}")
    private int expiration;
    public String getJwtFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if(bearerToken != null && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }
    public String generateToken(UserDetailsImpl userDetails){
       String username = userDetails.getUsername();
       String roles = userDetails.getAuthorities().stream()
               .map(authority -> authority.getAuthority())
               .collect(Collectors.joining(","));
       return Jwts.builder()
               .subject(username)
               .claim("roles", roles)
               .issuedAt(new Date())
               .expiration(new Date((new Date().getTime() + expiration)))
               .signWith(key())
               .compact();
    }
    public String getUsernameFromToken(String Token){
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(Token)
                .getPayload()
                .getSubject();
    }
    public boolean validateJwt(String token) {
        try {
            Jwts.parser()
                    .verifyWith((SecretKey) key())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            throw new RuntimeException(e);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
}
