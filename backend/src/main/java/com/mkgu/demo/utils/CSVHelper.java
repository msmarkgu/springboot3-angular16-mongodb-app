package com.mkgu.demo.utils;

import java.io.InputStreamReader;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Set;
import java.util.HashMap;
import java.util.HashSet;

import com.mkgu.demo.model.JobItem;

import com.opencsv.CSVReader;
import org.springframework.web.multipart.MultipartFile;

public class CSVHelper {
  public static List<JobItem> readCSVFile(MultipartFile file, List<JobItem> existingItems, int max_items)
      throws Exception {
    List<JobItem> jobItems = new ArrayList<>();

    Set<JobItem> existingItemSet = new HashSet<>(existingItems);

    // Create a new CSVReader object with the InputStream from the uploaded file
    CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()));

    Map<String, Integer> headerMap = new HashMap<>();

    // Assume the 1st line is column header.
    String[] headerCols = reader.readNext();

    // Assume columns are: "Company", "Title", "Date", "Status", "Link".
    int total_cols = headerCols.length;
    for (int i = 0; i < total_cols; i++) {
      headerMap.put(headerCols[i], i);
    }

    int row_count = 0;
    int max_existing_id = 0;
    for(JobItem item : existingItems) {
      max_existing_id = Math.max(Integer.parseInt(item.getId()), max_existing_id);
    }

    String[] columns;
    JobItem newItem;
    int newitem_count = 0;

    // Read the CSV file line by line
    while ((columns = reader.readNext()) != null) {
      // ignore empty lines and lines with different columns
      if (columns.length != total_cols) continue;

      row_count++;

      // limit records to import to prevent too large input
      if (row_count > max_items) break;

      // Parse the columns into variables
      String id = "";
      String company = columns[headerMap.get("Company")];
      String jobTitle = columns[headerMap.get("Title")];
      String dateApplied = columns[headerMap.get("Date")];
      String jobStatus = columns[headerMap.get("Status")];
      String applyLink = columns[headerMap.get("Link")];
      String location = "";

      newItem = new JobItem(id, jobTitle, company, location,
          applyLink, dateApplied, jobStatus);

      // de-dup
      if (!existingItemSet.contains(newItem)) {
        newitem_count++;
        // try to make the Ids to be continuous
        newItem.setId(Integer.toString(max_existing_id + newitem_count));
        jobItems.add(newItem);
      }
    }

    // Close the CSVReader object to release resources
    reader.close();

    return jobItems;
  }
}
