package com.ustiics_dms.model;

public class Sources {

	private String sourcesName;
	private String defaultReference;
	
	public Sources(String sourcesName, String defaultReference) {
		super();
		this.sourcesName = sourcesName;
		this.defaultReference = defaultReference;
	}

	public String getSourcesName() {
		return sourcesName;
	}

	public void setSourcesName(String sourcesName) {
		this.sourcesName = sourcesName;
	}

	public String getDefaultReference() {
		return defaultReference;
	}

	public void setDefaultReference(String defaultReference) {
		this.defaultReference = defaultReference;
	}
	
	
}
