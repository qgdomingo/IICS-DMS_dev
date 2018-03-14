package com.ustiics_dms.model;

public class RequestMail {
	
	private String id;
	private String type;
	private String senderName;
	private String sentBy;
	private String status;
	private String dateCreated;
	private String recipient;
	private String externalRecipient;
	private String addressLine1;
	private String addressLine2;
	private String addressLine3;
	private String subject;
	private String message;
	private String closingRemark;
	private String note;
	
	public RequestMail(String id, String type, String senderName, String sentBy, String status, String dateCreated,
			String recipient, String externalRecipient, String addressLine1, String addressLine2, String addressLine3,
			String subject, String message, String closingRemark, String note) {
		super();
		this.id = id;
		this.type = type;
		this.senderName = senderName;
		this.sentBy = sentBy;
		this.status = status;
		this.dateCreated = dateCreated;
		this.recipient = recipient;
		this.externalRecipient = externalRecipient;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.addressLine3 = addressLine3;
		this.subject = subject;
		this.message = message;
		this.closingRemark = closingRemark;
		this.note = note;
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
	public String getSenderName() {
		return senderName;
	}
	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}
	public String getSentBy() {
		return sentBy;
	}
	public void setSentBy(String sentBy) {
		this.sentBy = sentBy;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(String dateCreated) {
		this.dateCreated = dateCreated;
	}
	public String getRecipient() {
		return recipient;
	}
	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}
	public String getExternalRecipient() {
		return externalRecipient;
	}
	public void setExternalRecipient(String externalRecipient) {
		this.externalRecipient = externalRecipient;
	}
	public String getAddressLine1() {
		return addressLine1;
	}
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}
	public String getAddressLine2() {
		return addressLine2;
	}
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}
	public String getAddressLine3() {
		return addressLine3;
	}
	public void setAddressLine3(String addressLine3) {
		this.addressLine3 = addressLine3;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getClosingRemark() {
		return closingRemark;
	}
	public void setClosingRemark(String closingRemark) {
		this.closingRemark = closingRemark;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
}
