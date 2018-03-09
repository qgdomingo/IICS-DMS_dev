package com.ustiics_dms.model;

public class TaskStatistics {

	private String taskTitle;
	private int onTimeSubmission;
	private int lateSubmission;
	private int noSubmission;
	
	public TaskStatistics(String taskTitle, int onTimeSubmission, int lateSubmission, int noSubmission) {
		super();
		this.taskTitle = taskTitle;
		this.onTimeSubmission = onTimeSubmission;
		this.lateSubmission = lateSubmission;
		this.noSubmission = noSubmission;
	}
	
	public TaskStatistics(int onTimeSubmission, int lateSubmission, int noSubmission) {
		super();
		this.onTimeSubmission = onTimeSubmission;
		this.lateSubmission = lateSubmission;
		this.noSubmission = noSubmission;
	}

	public String getTaskTitle() {
		return taskTitle;
	}

	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}

	public int getOnTimeSubmission() {
		return onTimeSubmission;
	}

	public void setOnTimeSubmission(int onTimeSubmission) {
		this.onTimeSubmission = onTimeSubmission;
	}

	public int getLateSubmission() {
		return lateSubmission;
	}

	public void setLateSubmission(int lateSubmission) {
		this.lateSubmission = lateSubmission;
	}

	public int getNoSubmission() {
		return noSubmission;
	}

	public void setNoSubmission(int noSubmission) {
		this.noSubmission = noSubmission;
	}
	
	
}
