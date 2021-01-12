package com.raf.asmi.karte.dto;

public class S1ChangeForm {
	private int milje ;

	public S1ChangeForm() {}
	public S1ChangeForm(int milje) {
		this.milje=milje;
	}

	public int getMilje() {
		return milje;
	}

	public void setMilje(int milje) {
		this.milje = milje;
	}

	public String toJson() {
		// Stvarno mora da postoji elegantniji nacin da se ovo  uradi
		return "{\"milje\":\""+this.milje+"\"}";
	}

	
}
