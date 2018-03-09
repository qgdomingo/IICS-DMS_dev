package com.ustiics_dms.model;

public class Event {
	
	private String id;
	private String title;
	private String location;
	private String startDateTime;
	private String endDateTime;
	private String description;
	private String createdBy;
	
	public Event(String id, String title, String location, String startDateTime, String endDateTime, String description,
			String createdBy) {
		super();
		this.id = id;
		this.title = title;
		this.location = location;
		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;
		this.description = description;
		this.createdBy = createdBy;
	}
	
	public Event(String title, String startDateTime, String endDateTime) {
		super();
		this.title = title;
		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;
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
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getStartDateTime() {
		return startDateTime;
	}
	public void setStartDateTime(String startDateTime) {
		this.startDateTime = startDateTime;
	}
	public String getEndDateTime() {
		return endDateTime;
	}
	public void setEndDateTime(String endDateTime) {
		this.endDateTime = endDateTime;
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

	
}
