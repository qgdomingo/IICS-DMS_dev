package com.ustiics_dms.model;

public class ExternalUser {

	private String type;
	private String id;
	private String threadNumber;
	private String firstName;
	private String lastName;
	private String email;
	private String contactNumber;
	private String affiliation;
	private String subject;
	private String message;
	private String fileName;
	private String status;
	private String timestamp;
	
	
	public ExternalUser(String id, String threadNumber, String firstName, String lastName, String email,
			String contactNumber, String affiliation, String subject, String message, String fileName, String status,
			String timestamp) {
		super();
		this.type = "External to Internal";
		this.id = id;
		this.threadNumber = threadNumber;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNumber = contactNumber;
		this.affiliation = affiliation;
		this.subject = subject;
		this.message = message;
		this.fileName = fileName;
		this.status = status;
		this.timestamp = timestamp;
	}
	
	public ExternalUser(String threadNumber, String firstName, String lastName, String email,
			String contactNumber, String affiliation, String subject) {
		super();
		this.threadNumber = threadNumber;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNumber = contactNumber;
		this.affiliation = affiliation;
		this.subject = subject;
	}

	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getThreadNumber() {
		return threadNumber;
	}


	public void setThreadNumber(String threadNumber) {
		this.threadNumber = threadNumber;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getContactNumber() {
		return contactNumber;
	}


	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}


	public String getAffiliation() {
		return affiliation;
	}


	public void setAffiliation(String affiliation) {
		this.affiliation = affiliation;
	}


	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getTimestamp() {
		return timestamp;
	}


	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	
	
}
