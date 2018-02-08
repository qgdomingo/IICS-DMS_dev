package com.ustiics_dms.model;

public class Document {

	private String id;
	private String type;
	private String title;
	private String category;
	private String fileName;
	private String description;
	private String createdBy;
	private String timeCreated;
	
	public Document(String id, String type, String title, String category, String fileName, String description,
			String createdBy, String timeCreated) {
		super();
		this.id = id;
		this.type = type;
		this.title = title;
		this.category = category;
		this.fileName = fileName;
		this.description = description;
		this.createdBy = createdBy;
		this.timeCreated = timeCreated;
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

	public String getTimeCreated() {
		return timeCreated;
	}

	public void setTimeCreated(String timeCreated) {
		this.timeCreated = timeCreated;
	}
	
	
	
	
}
