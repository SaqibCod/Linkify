package com.saq.Linkify.repository;

import com.saq.Linkify.model.UrlMapping;
import com.saq.Linkify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {

     List<UrlMapping> findByUser(User user);
     UrlMapping findByShortUrl(String shortUrl);
}
