package com.ustiics_dms.model;

public class Document {

	private String id;
	private String type;
	private String threadNumber;
	private String referenceNo;
	private String sourceRecipient;
	private String title;
	private String category;
	private String actionRequired;
	private String fileName;
	private String description;
	private String createdBy;
	private String email;
	private String status;
	private String timeCreated;
	private String dueOn;
	private String note;
	private String department;
	
	public Document(String type, String id, String threadNumber, String sourceRecipient, String title, String category, 
			String fileName, String description, String createdBy, String email, String timeCreated, String referenceNo, 
			String actionRequired, String status, String dueOn, String note) {
		super();
		this.type = type;
		this.id = id;
		this.threadNumber = threadNumber;
		this.sourceRecipient = sourceRecipient;
		this.title = title;
		this.category = category;
		this.fileName = fileName;
		this.description = description;
		this.createdBy = createdBy;
		this.email = email;
		this.timeCreated = timeCreated;
		this.referenceNo = referenceNo;
		this.actionRequired = actionRequired;
		this.status = status;
		this.dueOn = dueOn;
		this.note = note;
	}
	
	public Document(String id, String type, String threadNumber, String referenceNo, String sourceRecipient, String title, 
			String category, String actionRequired, String fileName, String description, String createdBy, String email, 
			String status, String timeCreated, String department, String dueOn, String note) {
		super();
		this.type = type;
		this.id = id;
		this.threadNumber = threadNumber;
		this.sourceRecipient = sourceRecipient;
		this.title = title;
		this.category = category;
		this.fileName = fileName;
		this.description = description;
		this.createdBy = createdBy;
		this.email = email;
		this.timeCreated = timeCreated;
		this.referenceNo = referenceNo;
		this.actionRequired = actionRequired;
		this.status = status;
		this.department = department;
		this.dueOn = dueOn;
		this.note = note;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getActionRequired() {
		return actionRequired;
	}

	public void setActionRequired(String actionRequired) {
		this.actionRequired = actionRequired;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTimeCreated() {
		return timeCreated;
	}

	public void setTimeCreated(String timeCreated) {
		this.timeCreated = timeCreated;
	}

	public String getDueOn() {
		return dueOn;
	}

	public void setDueOn(String dueOn) {
		this.dueOn = dueOn;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
}
