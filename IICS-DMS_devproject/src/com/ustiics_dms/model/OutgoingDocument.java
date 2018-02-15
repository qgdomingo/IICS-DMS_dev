package com.ustiics_dms.model;

public class OutgoingDocument {

	private String type;
	private String id;
	private String referenceNo;
	private String sourceRecipient;
	private String title;
	private String category;
	private String fileName;
	private String description;
	private String createdBy;
	private String email;
	private String timeCreated;
	private String department;
	public OutgoingDocument(String type, String id, String referenceNo, String sourceRecipient, String title,
			String category, String fileName, String description, String createdBy, String email, String timeCreated,
			String department) {
		super();
		this.type = type;
		this.id = id;
		this.referenceNo = referenceNo;
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getReferenceNo() {
		return referenceNo;
	}
	public void setReferenceNo(String referenceNo) {
		this.referenceNo = referenceNo;
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
