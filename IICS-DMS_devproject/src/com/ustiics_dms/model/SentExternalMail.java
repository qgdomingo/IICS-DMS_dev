package com.ustiics_dms.model;

public class SentExternalMail {
	// in one String - RECIPIENT full name + email-ok
				// recipient affiliation-ok
				// recipient contact number-ok
				// in one String - Sender full name + email-ok
				// sent timestamp
				// subject
				// message
				// mail ID
				// mail file name
				// thread number
	private String recipientName;
	private String affiliation;
	private String recipientContactNo;
	private String senderName;
	private String timeStamp;
	private String subject;
	private String message;
	private String mailID;
	private String fileName;
	private String threadNumber;
	
	public SentExternalMail(String recipientName, String affiliation, String recipientContactNo, String senderName,
			String timeStamp, String subject, String message, String mailID, String fileName, String threadNumber) {
		super();
		this.recipientName = recipientName;
		this.affiliation = affiliation;
		this.recipientContactNo = recipientContactNo;
		this.senderName = senderName;
		this.timeStamp = timeStamp;
		this.subject = subject;
		this.message = message;
		this.mailID = mailID;
		this.fileName = fileName;
		this.threadNumber = threadNumber;
	}
	public String getRecipientName() {
		return recipientName;
	}
	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}
	public String getAffiliation() {
		return affiliation;
	}
	public void setAffiliation(String affiliation) {
		this.affiliation = affiliation;
	}
	public String getRecipientContactNo() {
		return recipientContactNo;
	}
	public void setRecipientContactNo(String recipientContactNo) {
		this.recipientContactNo = recipientContactNo;
	}
	public String getSenderName() {
		return senderName;
	}
	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}
	public String getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
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
	public String getMailID() {
		return mailID;
	}
	public void setMailID(String mailID) {
		this.mailID = mailID;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getThreadNumber() {
		return threadNumber;
	}
	public void setThreadNumber(String threadNumber) {
		this.threadNumber = threadNumber;
	}
	
	
	
}
