package com.ustiics_dms.model;

public class Archive {

	private String id;
	private String title;
	private String status;
	private String timestamp;
	private String academicYear;
	
	public Archive(String id, String title, String status, String timestamp, String academicYear) {
		super();
		this.id = id;
		this.title = title;
		this.status = status;
		this.timestamp = timestamp;
		this.academicYear = academicYear;
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

	public String getAcademicYear() {
		return academicYear;
	}

	public void setAcademicYear(String academicYear) {
		this.academicYear = academicYear;
	}
	

	
	
	
}
