package com.ustiics_dms.model;

public class Event {
	
	private String id;
	private String title;
	private String location;
	private String startDateTime;
	private String endDateTime;
	private String description;
	private String createdBy;
	private String email;
	private int allDayEvent_Flag;
	
	public Event(String id, String title, String location, int allDayEvent_Flag, String startDateTime, String endDateTime, String description,
			String createdBy, String email) {
		super();
		this.id = id;
		this.title = title;
		this.location = location;
		this.allDayEvent_Flag = allDayEvent_Flag;
		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;
		this.description = description;
		this.createdBy = createdBy;
		this.email = email;
	}
	
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
	
	public Event(String id, String title, String location, String startDateTime, String endDateTime, String createdBy) {
		super();
		this.id = id;
		this.title = title;
		this.location = location;
		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;
		this.createdBy = createdBy;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAllDayEvent_Flag() {
		return allDayEvent_Flag;
	}

	public void setAllDayEvent_Flag(int allDayEvent_Flag) {
		this.allDayEvent_Flag = allDayEvent_Flag;
	}

	
}
