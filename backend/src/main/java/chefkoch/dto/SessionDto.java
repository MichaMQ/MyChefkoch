package chefkoch.dto;

public class SessionDto {
	private PersonDto person;
	private AccountDto account;
	
	public PersonDto getPerson() {
		return person;
	}
	public void setPerson(PersonDto person) {
		this.person = person;
	}
	public AccountDto getAccount() {
		return account;
	}
	public void setAccount(AccountDto account) {
		this.account = account;
	}
}
