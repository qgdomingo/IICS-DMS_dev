package com.ustiics_dms.model;

public class Account  {

	private int facultyNumber;
	private String firstName;
	private String lastName;
	private String email;
	private String userType;
	private String department;
	private String status;
	
	public Account(int facultyNumber, String firstName, String lastName, String email, String userType, String department, String status)
	{

		setFacultyNumber(facultyNumber);
		setFirstName(firstName);
		setLastName(lastName);
		setEmail(email);
		setUserType(userType);
		setDepartment(department);
		setStatus(status);

		
	}

	public int getFacultyNumber() {
		return facultyNumber;
	}

	public void setFacultyNumber(int facultyNumber) {
		this.facultyNumber = facultyNumber;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
	
}
