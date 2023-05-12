package com.mkgu.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jobItem")
public class JobItem {

    @Id
    private String id;
    private String jobTitle;
    private String company;
    private String location;
    private String applyLink;
    private String dateApplied;
    private String jobStatus;

    public JobItem() {

    }

    public JobItem(String id, String title, String company, String location,
            String link, String date, String status) {

        super();
        this.id = (id!=null) ? id : "0";
        this.jobTitle = (title!=null) ? title : "";;
        this.company = (company!=null) ? company : "";
        this.location = (location!=null) ? location : "";
        this.applyLink = (link!=null) ? link : "";
        this.dateApplied = (date!=null) ? date : "";
        this.jobStatus = (status!=null) ? status : "";
    }

    @Override
    public boolean equals(Object object) {
        if (object instanceof JobItem) {
            JobItem item = (JobItem) object;

            if (item.getJobTitle().equals(this.jobTitle) &&
                item.getCompany().equals(this.company) &&
                item.getLocation().equals(this.location) &&
                item.getApplyLink().equals(this.applyLink))
                return true;
            else
                return false;
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        return (this.getJobTitle() + this.getCompany() + this.getApplyLink()).hashCode();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJobTitle() {
        return this.jobTitle;
    }

    public void setJobTitle(String title) {
        this.jobTitle = (title!=null) ? title : "";
    }

    public String getCompany() {
        return this.company;
    }

    public void setCompany(String company) {
        this.company = (company!=null) ? company : "";
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = (location!=null) ? location : "";
    }

    public String getApplyLink() {
        return applyLink;
    }

    public void setApplyLink(String link) {
        this.applyLink = (link!=null) ? link : "";
    }

    public String getDateApplied() {
        return this.dateApplied;
    }

    public void setDateApplied(String date) {
        this.dateApplied = (date!=null) ? date : "";
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String status) {
        this.jobStatus = (status!=null) ? status : "";
    }
}