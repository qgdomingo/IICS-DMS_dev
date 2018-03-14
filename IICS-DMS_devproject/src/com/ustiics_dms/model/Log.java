package com.ustiics_dms.model;

public class Log {
	
	private String timestamp;
	private String logType;
	private String logInformation;
	private String user;
	private String userType;
	private String department;
	
	public Log(String timestamp, String logType, String logInformation, String user, String userType,
			String department) {
		super();
		this.timestamp = timestamp;
		this.logType = logType;
		this.logInformation = logInformation;
		this.user = user;
		this.userType = userType;
		this.department = department;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getLogType() {
		return logType;
	}

	public void setLogType(String logType) {
		this.logType = logType;
	}

	public String getLogInformation() {
		return logInformation;
	}

	public void setLogInformation(String logInformation) {
		this.logInformation = logInformation;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}
	
	
	
}
