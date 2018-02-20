package com.ustiics_dms.model;

public class AssignedToTask {
	
	private String id;
	private String name;
	private String email;
	private String title;
	private String fileName;
	private String description;
	private String status;
	private String dateUploaded;
	
	public AssignedToTask(String id, String name, String email, String title, String fileName, String description,
			String status, String dateUploaded) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.title = title;
		this.fileName = fileName;
		this.description = description;
		this.status = status;
		this.dateUploaded = dateUploaded;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDateUploaded() {
		return dateUploaded;
	}
	public void setDateUploaded(String dateUploaded) {
		this.dateUploaded = dateUploaded;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	
}
