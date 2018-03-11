package com.ustiics_dms.model;

public class Notification {

	private String id;
	private String description;
	private String flag;
	
	
	public Notification(String id, String description, String flag) {
		super();
		this.id = id;
		this.description = description;
		this.flag = flag;
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
	
	
}
