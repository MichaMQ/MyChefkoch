package chefkoch.dto;

public class GenericDto implements Comparable<GenericDto> {
	private Integer id;
	private String name;

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

	@Override
	public int compareTo(GenericDto o) {
	    String myName = this.name;
	    String oName = o.getName();
	    return myName.compareTo(oName);
	}
}
