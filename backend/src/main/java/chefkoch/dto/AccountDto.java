package chefkoch.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonCreator;

import chefkoch.entity.Account;
import chefkoch.service.enums.AccountType;

public class AccountDto {
	private String username,passwordhash,token,uuid;
	private Integer id;
	private AccountType accountType;
	private Date expirationdate;
	
	@JsonCreator
	public AccountDto() {}

	public AccountDto(Account account) {
		this.setId(account.getId());
		this.setUsername(account.getUsername());
		this.setPasswordhash(account.getPasswordhash());
		this.setToken(account.getToken());
		this.setAccountType(account.getType());
		this.setExpirationdate(account.getExpirationdate());
		this.setUuid(account.getUuid());
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPasswordhash() {
		return passwordhash;
	}

	public void setPasswordhash(String passwordhash) {
		this.passwordhash = passwordhash;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	public Date getExpirationdate() {
		return expirationdate;
	}

	public void setExpirationdate(Date expirationdate) {
		this.expirationdate = expirationdate;
	}

}
