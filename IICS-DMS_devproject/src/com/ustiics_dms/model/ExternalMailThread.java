package com.ustiics_dms.model;

public class ExternalMailThread {

	private String thread_number;
	private String name;
	private String email;
	private String status;
	
	
	public ExternalMailThread(String thread_number, String name, String email, String status) {
		super();
		this.thread_number = thread_number;
		this.name = name;
		this.email = email;
		this.status = status;
	}
	
	public String getThread_number() {
		return thread_number;
	}
	public void setThread_number(String thread_number) {
		this.thread_number = thread_number;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	
	
}
