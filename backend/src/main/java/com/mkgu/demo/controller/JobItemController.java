package com.mkgu.demo.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mkgu.demo.model.JobItem;
import com.mkgu.demo.exception.ResourceNotFoundException;
import com.mkgu.demo.repository.JobItemRepository;
import com.mkgu.demo.utils.CSVHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class JobItemController {
    @Autowired
    private JobItemRepository jobItemRepository;

    // get all job items
    @GetMapping("/jobItems")
    public ResponseEntity<Map<String, Object>> getAlljobItems(
        @RequestParam(required = false) String searchTerm,
        @RequestParam(defaultValue = "jobTitle") String searchBy,
        @RequestParam(defaultValue = "0") int currPage,
        @RequestParam(defaultValue = "10") int pageSize) {
        try {
            List<JobItem> jobItems = new ArrayList<>();
            Pageable pagingReq = PageRequest.of(currPage, pageSize);

            System.out.println("searchTerm = " + searchTerm + ", searchBy = " + searchBy);
            
            Page<JobItem> pagedItems;
            if (searchTerm == null)
                pagedItems = jobItemRepository.findAll(pagingReq);
            else {
                if (searchBy!=null && searchBy.equalsIgnoreCase("company")) {
                    pagedItems = jobItemRepository.findByCompanyContainingIgnoreCase(searchTerm, pagingReq);
                } else if (searchBy!=null && searchBy.equalsIgnoreCase("location")) {
                    pagedItems = jobItemRepository.findByLocationContainingIgnoreCase(searchTerm, pagingReq);
                } else {
                    pagedItems = jobItemRepository.findByJobTitleContainingIgnoreCase(searchTerm, pagingReq);
                }
            }

            jobItems = pagedItems.getContent();

            System.out.println("getAlljobItems() - currPage = " + currPage + ", jobItems.size() = " + jobItems.size());

            Map<String, Object> response = new HashMap<>();
            // the key names will be picked up by frontend!
            response.put("JobItems", jobItems);
            response.put("currentPage", pagedItems.getNumber());
            response.put("totalItems", pagedItems.getTotalElements());
            response.put("totalPages", pagedItems.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // rest API to create a new item
    @PostMapping("/jobItems")
    public JobItem createJobItem(@RequestBody JobItem jobItem) {
        int row_count = jobItemRepository.findAll().size();
        jobItem.setId(Integer.toString(row_count+1));
        return jobItemRepository.save(jobItem);
    }

    // rest api to read a job item specified by id
    @GetMapping("/jobItems/{id}")
    public ResponseEntity<JobItem> getJobItemById(@PathVariable String id) {
        JobItem item = jobItemRepository
                        .findById(id)
                        .orElseThrow(
                            () -> new ResourceNotFoundException("Job item not found by id :" + id)
                        );
        return ResponseEntity.ok(item);
    }

    // rest api to update the job item specified by id
    @PutMapping("/jobItems/{id}")
    public ResponseEntity<JobItem> updateJobItem(
                @PathVariable String id,
                @RequestBody JobItem itemDetails
            ) {
        JobItem item = jobItemRepository
                        .findById(id)
                        .orElseThrow(
                            () -> new ResourceNotFoundException("Job item not found by id :" + id)
                        );
        item.setJobTitle(itemDetails.getJobTitle());
        item.setCompany(itemDetails.getCompany());
        item.setLocation(itemDetails.getLocation());
        item.setApplyLink(itemDetails.getApplyLink());
        item.setDateApplied(itemDetails.getDateApplied());
        item.setJobStatus(itemDetails.getJobStatus());
        JobItem updatedItem = jobItemRepository.save(item);
        return ResponseEntity.ok(updatedItem);
    }

    // rest api to delete the job item specified by id
    @DeleteMapping("/jobItems/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteJobItem(@PathVariable String id) {
        JobItem item = jobItemRepository
                        .findById(id)
                        .orElseThrow(
                            () -> new ResourceNotFoundException("Job item not found by id :" + id)
                        );
        jobItemRepository.delete(item);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/jobItems/import")
    public List<JobItem> importFile(MultipartFile file) {
        try {
            List<JobItem> existing_items = jobItemRepository.findAll();

            List<JobItem> itemsToAdd = CSVHelper.readCSVFile(file, existing_items, 100);

            System.out.println("itemsToAdd.size() = " + itemsToAdd.size());

            if (itemsToAdd.size() > 0) {
                jobItemRepository.saveAll(itemsToAdd);
            }

            System.out.println("File uploaded successfully: " + file.getOriginalFilename());

            return jobItemRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<JobItem>();
        }
    }

    @GetMapping("/jobItems/export")
    public ResponseEntity<ByteArrayResource> exportCsv() throws IOException {
        List<JobItem> items = jobItemRepository.findAll();

        String csvData = generateCsv(items);

        byte[] bytes = csvData.getBytes();
        ByteArrayResource csvDataBytes = new ByteArrayResource(bytes);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=job-application-records.csv");
        headers.add(HttpHeaders.CONTENT_TYPE, "text/csv");
        headers.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION);
        headers.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_TYPE);

        System.out.println("exportCsv() - items.size() = " + items.size());

        return ResponseEntity.ok().headers(headers).body(csvDataBytes);
    }

    private String generateCsv(List<JobItem> items) throws IOException {
        StringWriter writer = new StringWriter();
        StatefulBeanToCsv<JobItem> beanToCsv;
        try {
            beanToCsv = new StatefulBeanToCsvBuilder<JobItem>(writer).build();
            beanToCsv.write(items);
        } catch (CsvDataTypeMismatchException | CsvRequiredFieldEmptyException e) {
            // Handle the exceptions here
            // You can log the error message or return an error response
            e.printStackTrace();
        }
        writer.flush();
        return writer.toString();
    }
}
