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
	private int displayInvitedUsers;
	private String status;
	
	public Event(String id, String title, String location, int allDayEvent_Flag, String startDateTime, String endDateTime, String description,
			String createdBy, String email, int displayInvitedUsers, String status) {
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
		this.displayInvitedUsers = displayInvitedUsers;
		this.status = status;
	}
	
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
			String createdBy, int displayInvitedUsers) {
		super();
		this.id = id;
		this.title = title;
		this.location = location;
		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;
		this.description = description;
		this.createdBy = createdBy;
		this.displayInvitedUsers = displayInvitedUsers;
	}
	
	public Event(String id, String title, String location, String startDateTime, String endDateTime, String description,
			String status, String createdBy) {
		super();
		this.id = id;
		this.title = title;
		this.location = location;
		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;
		this.description = description;
		this.createdBy = createdBy;
		this.status = status;
	}
	
	public Event(String id, String title, String location, String startDateTime, String endDateTime, String status, String createdBy) {
		super();
		this.id = id;
		this.title = title;
		this.location = location;
		this.startDateTime = startDateTime;
		this.endDateTime = endDateTime;
		this.status = status;
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
}
