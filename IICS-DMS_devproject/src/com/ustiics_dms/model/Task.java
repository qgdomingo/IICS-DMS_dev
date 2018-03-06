package com.ustiics_dms.model;

public class Task {
	
	private String id;
	private String title;
	private String deadline;
	private String category;
	private String instructions;
	private String status;
	private String assignedBy;
	private String dateCreated;
	private String fullName;
	
	public Task(String id, String title, String deadline, String category, String instructions, String status,
			String assignedBy, String dateCreated) {
		super();
		this.id = id;
		this.title = title;
		this.deadline = deadline;
		this.category = category;
		this.instructions = instructions;
		this.status = status;
		this.assignedBy = assignedBy;
		this.dateCreated = dateCreated;
	}
	
	public Task(String title, String deadline, String category, String fullName, String assignedBy) {
		super();
		
		this.title = title;
		this.deadline = deadline;
		this.category = category;
		this.fullName = fullName;
		this.assignedBy = assignedBy;
	}
	
	public String getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(String dateCreated) {
		this.dateCreated = dateCreated;
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
	public String getDeadline() {
		return deadline;
	}
	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getInstructions() {
		return instructions;
	}
	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAssignedBy() {
		return assignedBy;
	}
	public void setAssignedBy(String assignedBy) {
		this.assignedBy = assignedBy;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	

}
