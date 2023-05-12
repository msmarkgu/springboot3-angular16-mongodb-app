package com.mkgu.demo.repository;

import com.mkgu.demo.model.JobItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JobItemRepository extends MongoRepository<JobItem, String> {
    // The target column name is implied in the method name!!
    // In this case, it's the "JobTitle" field.
    // rely on Spring JPA to map the input value to the target field.
    Page<JobItem> findByJobTitleContainingIgnoreCase(String jobTitle, Pageable pageable);

    Page<JobItem> findByCompanyContainingIgnoreCase(String company, Pageable pageable);

    Page<JobItem> findByLocationContainingIgnoreCase(String company, Pageable pageable);
}