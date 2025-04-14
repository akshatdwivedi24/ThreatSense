package com.finalproject.repository;

import com.finalproject.entity.IOC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface IOCRepository extends JpaRepository<IOC, Long> {
    List<IOC> findByType(String type);
    List<IOC> findByValueContaining(String value);
    List<IOC> findByTagsContaining(String tag);
    List<IOC> findBySeverity(String severity);

    @Query("SELECT i FROM IOC i WHERE i.type = :type AND i.value LIKE %:value%")
    List<IOC> findByTypeAndValue(@Param("type") String type, @Param("value") String value);
} 