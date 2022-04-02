package chefkoch.requestObj;

public class SuccessObj {
	private Boolean success;
	private String msg;
	
	public SuccessObj(Boolean state, String msg) {
		this.success = state;
		this.msg = msg;
	}
	
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
}
