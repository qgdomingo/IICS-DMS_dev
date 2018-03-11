package com.ustiics_dms.model;

public class EventResponse {
	
	private String fullName;
	private String email;
	private String status;
	private String response;
	private String dateResponse;
	
	public EventResponse(String fullName, String email, String status, String response, String dateResponse) {
		super();
		this.fullName = fullName;
		this.email = email;
		this.status = status;
		this.response = response;
		this.dateResponse = dateResponse;
	}
	
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
	public String getDateResponse() {
		return dateResponse;
	}
	public void setDateResponse(String dateResponse) {
		this.dateResponse = dateResponse;
	}
	
	
}
