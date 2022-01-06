import { ClientStatus } from './../../../enums/ClientStatus';
import { RoleId } from "../../../enums/RoleId";
import { QueryPagination } from "../../QueryPagination";

export class FindClientQuery extends QueryPagination {
    roleAuthId: RoleId;
    keyword: string | null;
    status: ClientStatus | null;
}