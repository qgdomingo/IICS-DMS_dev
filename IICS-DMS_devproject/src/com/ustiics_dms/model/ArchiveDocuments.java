package com.ustiics_dms.model;

public class ArchiveDocuments {

	private String id;
	private String folderID;
	private String type;
	private String sourceRecipient;
	private String title;
	private String category;
	private String fileName;
	private String description;
	private String uploadedBy;
	private String email;
	private String uploadDate;
	private String department;
	private String referenceNo;
	private String acadYear;
	
	public ArchiveDocuments(String id, String folderID, String type, String sourceRecipient, String title,
			String category, String fileName, String description, String uploadedBy, String email, String uploadDate,
			String department, String referenceNo, String acadYear) {
		super();
		this.id = id;
		this.folderID = folderID;
		this.type = type;
		this.sourceRecipient = sourceRecipient;
		this.title = title;
		this.category = category;
		this.fileName = fileName;
		this.description = description;
		this.uploadedBy = uploadedBy;
		this.email = email;
		this.uploadDate = uploadDate;
		this.department = department;
		this.referenceNo = referenceNo;
		this.acadYear = acadYear;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFolderID() {
		return folderID;
	}

	public void setFolderID(String folderID) {
		this.folderID = folderID;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public String getUploadedBy() {
		return uploadedBy;
	}

	public void setUploadedBy(String uploadedBy) {
		this.uploadedBy = uploadedBy;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(String uploadDate) {
		this.uploadDate = uploadDate;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getReferenceNo() {
		return referenceNo;
	}

	public void setReferenceNo(String referenceNo) {
		this.referenceNo = referenceNo;
	}

	public String getAcadYear() {
		return acadYear;
	}

	public void setAcadYear(String acadYear) {
		this.acadYear = acadYear;
	}
	
	
}
