package com.ustiics_dms.model;

public class Task {
	
	private String id;
	private String title;
	private String deadline;
	private String category;
	private String instructions;
	private String status;
	private String assignedBy;
	
	
	public Task(String id, String title, String deadline, String category, String instructions, String status,
			String assignedBy) {
		super();
		this.id = id;
		this.title = title;
		this.deadline = deadline;
		this.category = category;
		this.instructions = instructions;
		this.status = status;
		this.assignedBy = assignedBy;
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


}
