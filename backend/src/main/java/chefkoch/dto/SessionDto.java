package chefkoch.dto;

public class SessionDto {
	private PersonDto person;
	private AccountDto account;
	private Integer stateCode;
	private String msg;
	
	public static SessionDto getStateCode(Integer stateCode, String msg) {
		SessionDto ret = new SessionDto();
		ret.setStateCode(stateCode);
		ret.setMsg(msg);
		return ret;
	}
	
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
	public Integer getStateCode() {
		return stateCode;
	}
	public void setStateCode(Integer stateCode) {
		this.stateCode = stateCode;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
}
