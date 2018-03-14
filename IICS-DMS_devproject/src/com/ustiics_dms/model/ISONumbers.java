package com.ustiics_dms.model;

public class ISONumbers {

	private String isoNumber;
	private String purpose;
	private String type;
	private String generatedBy;
	private String department;
	private String schoolYear;
	private String generatedDate;
	
	public ISONumbers(String isoNumber, String purpose, String type, String generatedBy, String generatedDate,
			String schoolYear) {
		super();
		this.isoNumber = isoNumber;
		this.purpose = purpose;
		this.type = type;
		this.generatedBy = generatedBy;
		this.generatedDate = generatedDate;
		this.schoolYear = schoolYear;
	}

	public String getIsoNumber() {
		return isoNumber;
	}

	public void setIsoNumber(String isoNumber) {
		this.isoNumber = isoNumber;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getGeneratedBy() {
		return generatedBy;
	}

	public void setGeneratedBy(String generatedBy) {
		this.generatedBy = generatedBy;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getSchoolYear() {
		return schoolYear;
	}

	public void setSchoolYear(String schoolYear) {
		this.schoolYear = schoolYear;
	}

	public String getGeneratedDate() {
		return generatedDate;
	}

	public void setGeneratedDate(String generatedDate) {
		this.generatedDate = generatedDate;
	}
	
	
}
