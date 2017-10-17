package hr.gov.uprava.zupit.domain;

import java.util.Date;

public class SampleType {
	
	//private Integer id;
	private String ime;
	//private Integer status;
	//private String type;
	private String prezime;
	private String opis;
	private Date termin;
	//private Date date;
	
	/*public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}*/
	public String getIme() {
		return ime;
	}
	public void setIme(String name) {
	}
	/*public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}*/
	public String getOpis() {
		return opis;
	}
	public void setOpis(String type) {
		this.opis = type;
	}
	
	public String getPrezime() {
		return prezime;
	}
	public void setPrezime(String type) {
		this.prezime = type;
	}
	
	public Date getTermin() {
		return termin;
	}
	public void setTermin(Date type) {
		this.termin = type;
	}
	/*public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}*/
	

}
