import request from "@/utils/request"

export function findUsers(query){
    return request.post("findUsers",query);
}
export function deleteUser(query){
    return request.post("deleteUser",query);
}
export function addUpdateUser(query){
    return request.post("addUpdateUser",query);
}
export function findAllUsers(query){
    return request.post("findAllUsers",query);
}
export function findUsersByPid(query){
    return request.post("findUsersByPid",query);
}
