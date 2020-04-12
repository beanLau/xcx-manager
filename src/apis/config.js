import request from "@/utils/request"

export function changeAuthorStatus(query){
    return request.post("changeAuthorStatus",query);
}
export function getConfig(query){
    return request.post("getConfig",query);
}