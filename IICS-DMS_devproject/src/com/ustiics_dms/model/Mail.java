package com.ustiics_dms.model;

public class Mail {

	private String id;
	private String type;
	private String isoNumber;
	private String externalRecipient;
	private String subject;
	private String senderName;
	private String senderEmail;
	private String dateCreated;
	
	public Mail(String id, String type, String isoNumber, String externalRecipient, String subject, String senderName,
			String senderEmail, String dateCreated) {
		super();
		this.id = id;
		this.type = type;
		this.isoNumber = isoNumber;
		this.externalRecipient = externalRecipient;
		this.subject = subject;
		this.senderName = senderName;
		this.senderEmail = senderEmail;
		this.dateCreated = dateCreated;
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

	public String getExternalRecipient() {
		return externalRecipient;
	}

	public void setExternalRecipient(String externalRecipient) {
		this.externalRecipient = externalRecipient;
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
	
	
	
	
}
