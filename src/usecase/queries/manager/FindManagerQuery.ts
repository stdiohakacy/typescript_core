import { ManagerStatus } from "../../../enums/ManagerStatus";
import { RoleId } from "../../../enums/RoleId";
import { QueryPagination } from "../../QueryPagination";

export class FindManagerQuery extends QueryPagination {
    roleAuthId: RoleId;
    keyword: string | null;
    status: ManagerStatus | null;
}
