package chefkoch.dto;

public class GenericDto implements Comparable<GenericDto> {
	private Integer id;
	private String name;
	private String uuid;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	@Override
	public int compareTo(GenericDto o) {
	    String myName = this.name;
	    String oName = o.getName();
	    return myName.compareTo(oName);
	}
}
