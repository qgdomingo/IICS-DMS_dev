package com.ustiics_dms.model;

public class SentMail {

	private String subject;
	private String acknowledgement;
	
	
	public SentMail(String subject, String acknowledgement) {
		super();
		this.subject = subject;
		this.acknowledgement = acknowledgement;
	}
	
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getAcknowledgement() {
		return acknowledgement;
	}
	public void setAcknowledgement(String acknowledgement) {
		this.acknowledgement = acknowledgement;
	}
	
	
}
