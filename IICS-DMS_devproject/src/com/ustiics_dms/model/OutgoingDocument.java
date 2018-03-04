package com.ustiics_dms.model;

public class OutgoingDocument {

	private String id;
	private String type;
	private String threadNumber;
	private String sourceRecipient;
	private String title;
	private String category;
	private String fileName;
	private String description;
	private String createdBy;
	private String email;
	private String timeCreated;
	private String department;
	
	public OutgoingDocument(String id, String type, String threadNumber, String sourceRecipient, String title,
			String category, String fileName, String description, String createdBy, String email, String timeCreated,
			String department) {
		super();
		this.id = id;
		this.type = type;
		this.threadNumber = threadNumber;
		this.sourceRecipient = sourceRecipient;
		this.title = title;
		this.category = category;
		this.fileName = fileName;
		this.description = description;
		this.createdBy = createdBy;
		this.email = email;
		this.timeCreated = timeCreated;
		this.department = department;
	}
	
	public OutgoingDocument(String threadNumber, String title, String category, String timeCreated) {
		this.threadNumber = threadNumber;
		this.title = title;
		this.category = category;
		this.timeCreated = timeCreated;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getThreadNumber() {
		return threadNumber;
	}

	public void setThreadNumber(String threadNumber) {
		this.threadNumber = threadNumber;
	}

	public String getSourceRecipient() {
		return sourceRecipient;
	}

	public void setSourceRecipient(String sourceRecipient) {
		this.sourceRecipient = sourceRecipient;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTimeCreated() {
		return timeCreated;
	}

	public void setTimeCreated(String timeCreated) {
		this.timeCreated = timeCreated;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	
	
	
	
	
}
