package chefkoch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;

import chefkoch.entity.Person;
import chefkoch.service.enums.Role;

public class PersonDto implements Comparable<PersonDto> {
	private String firstname,surname,uuid;
	private Role role;
	private Integer id,account_id;
	
	@JsonCreator
	public PersonDto() {}

	public PersonDto(Person person) {
		this.setId(person.getId());
		this.setFirstname(person.getFirstname());
		this.setSurname(person.getSurname());
		this.setRole(person.getRole());
		this.setAccount_id(person.getAccount().getId());
		this.setUuid(person.getUuid());
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Integer getAccount_id() {
		return account_id;
	}

	public void setAccount_id(Integer account_id) {
		this.account_id = account_id;
	}

	public int compareTo(PersonDto o) {
    String mySort = this.getSurname()+this.getFirstname();
    String oSort = o.getSurname()+this.getFirstname();
    return mySort.compareTo(oSort);
}
	
}
