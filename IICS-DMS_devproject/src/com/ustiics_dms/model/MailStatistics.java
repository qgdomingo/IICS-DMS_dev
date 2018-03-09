package com.ustiics_dms.model;

public class MailStatistics {
	
	private String subject;
	private int read;
	private int unread;
	private int acknowledged;
	
	public MailStatistics(String subject, int read, int unread, int acknowledged) {
		super();
		this.subject = subject;
		this.read = read;
		this.unread = unread;
		this.acknowledged = acknowledged;
	}

	
	public MailStatistics(int read, int unread, int acknowledged) {
		super();
		this.read = read;
		this.unread = unread;
		this.acknowledged = acknowledged;
	}


	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public int getRead() {
		return read;
	}

	public void setRead(int read) {
		this.read = read;
	}

	public int getUnread() {
		return unread;
	}

	public void setUnread(int unread) {
		this.unread = unread;
	}

	public int getAcknowledged() {
		return acknowledged;
	}

	public void setAcknowledged(int acknowledged) {
		this.acknowledged = acknowledged;
	}

	
	
}
