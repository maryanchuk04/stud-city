import { GROUP_MOCK } from "../utils/constants";

export class GroupsService {
	#url = "/groups";
	
	getGroups() {
		return GROUP_MOCK;
	}
}