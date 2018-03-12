package com.ustiics_dms.model;

public class Notification {

	private String id;
	private String page;
	private String description;
	private String flag;
	private String timestamp;
	
	public Notification(String id, String page, String description, String flag, String timestamp) {
		super();
		this.id = id;
		this.page = page;
		this.description = description;
		this.flag = flag;
		this.timestamp = timestamp;
	}
	
	public Notification(String id, String page, String description, String timestamp) {
		super();
		this.id = id;
		this.page = page;
		this.description = description;
		this.timestamp = timestamp;
	}
	
	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}
	
	
}
