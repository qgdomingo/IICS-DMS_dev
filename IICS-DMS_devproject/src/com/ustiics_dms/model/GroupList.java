package com.ustiics_dms.model;

public class GroupList {
	
	private String groupName;
	private String firstName;
	private String lastName;
	private String email;
	
	public GroupList(String groupName, String firstName, String lastName, String email) {
		super();
		this.groupName = groupName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}
	
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
}
