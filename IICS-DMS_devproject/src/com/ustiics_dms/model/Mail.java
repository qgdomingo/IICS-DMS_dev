package com.ustiics_dms.model;

public class Mail {

	private String id;
	private String type;
	private String recipient;
	private String isoNumber;
	private String subject;
	private String message;
	private String senderName;
	private String senderEmail;
	private String dateCreated;
	private String schoolYear;
	private String acknowledgementStatus;
	private String acknowledgementTimestamp;
	private String acknowledgementRemarks;
	
	public Mail(String id, String type, String isoNumber, String subject, String senderName, String senderEmail, 
			String dateCreated, String acknowledgementStatus, String acknowledgementTimestamp, String acknowledgementRemarks,
			String schoolYear) {
		super();
		this.id = id;
		this.type = type;
		this.isoNumber = isoNumber;
		this.subject = subject;
		this.senderName = senderName;
		this.senderEmail = senderEmail;
		this.dateCreated = dateCreated;
		this.acknowledgementStatus = acknowledgementStatus;
		this.acknowledgementTimestamp = acknowledgementTimestamp;
		this.acknowledgementRemarks = acknowledgementRemarks;
		this.schoolYear = schoolYear;
	}
	
	public Mail(String id, String type, String isoNumber, String subject, String senderName, String senderEmail, 
			String dateCreated, String schoolYear) {
		super();
		this.id = id;
		this.type = type;
		this.isoNumber = isoNumber;
		this.subject = subject;
		this.senderName = senderName;
		this.senderEmail = senderEmail;
		this.dateCreated = dateCreated;
		this.schoolYear = schoolYear;
	}
	
	public Mail(String id, String type, String isoNumber, String subject, String dateCreated, String schoolYear) {
		super();
		this.id = id;
		this.type = type;
		this.isoNumber = isoNumber;
		this.subject = subject;
		this.dateCreated = dateCreated;
		this.schoolYear = schoolYear;
	}
	
	public Mail(String senderName, String acknowledgementStatus, String acknowledgementTimestamp, String acknowledgementRemarks) {
		super();
		this.senderName = senderName;
		this.acknowledgementStatus = acknowledgementStatus;
		this.acknowledgementTimestamp = acknowledgementTimestamp;
		this.acknowledgementRemarks = acknowledgementRemarks;
	}
	
	public String getSchoolYear() {
		return schoolYear;
	}

	public void setSchoolYear(String schoolYear) {
		this.schoolYear = schoolYear;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public String getIsoNumber() {
		return isoNumber;
	}

	public void setIsoNumber(String isoNumber) {
		this.isoNumber = isoNumber;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getSenderName() {
		return senderName;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	public String getSenderEmail() {
		return senderEmail;
	}

	public void setSenderEmail(String senderEmail) {
		this.senderEmail = senderEmail;
	}

	public String getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(String dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getAcknowledgementStatus() {
		return acknowledgementStatus;
	}

	public void setAcknowledgementStatus(String acknowledgementStatus) {
		this.acknowledgementStatus = acknowledgementStatus;
	}

	public String getAcknowledgementTimestamp() {
		return acknowledgementTimestamp;
	}

	public void setAcknowledgementTimestamp(String acknowledgementTimestamp) {
		this.acknowledgementTimestamp = acknowledgementTimestamp;
	}

	public String getAcknowledgementRemarks() {
		return acknowledgementRemarks;
	}

	public void setAcknowledgementRemarks(String acknowledgementRemarks) {
		this.acknowledgementRemarks = acknowledgementRemarks;
	}
	
	
	
	
}
