import request from "@/utils/request"

export function findTypes(query){
    return request.post("findTypes",query);
}
export function deleteType(query){
    return request.post("deleteType",query);
}
export function addUpdateType(query){
    return request.post("addUpdateType",query);
}
export function findAllTypes(query){
    return request.post("findAllTypes",query);
}
export function findTypesByPid(query){
    return request.post("findTypesByPid",query);
}
