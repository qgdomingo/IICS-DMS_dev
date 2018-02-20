package com.ustiics_dms.model;

public class PersonalDocument {
	
	private String type;
	private String id;
	private String title;
	private String category;
	private String fileName;
	private String description;
	private String createdBy;
	private String email;
	private String timeCreated;
	
	
	public PersonalDocument(String type, String id, String title, String category, String fileName, String description,
			String createdBy, String email, String timeCreated) 
	{
		super();
		this.type = type;
		this.id = id;
		this.title = title;
		this.category = category;
		this.fileName = fileName;
		this.description = description;
		this.createdBy = createdBy;
		this.email = email;
		this.timeCreated = timeCreated;
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
	
	
	
	

}
