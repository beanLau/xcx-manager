import request from "@/utils/request"

export function findSpecial(query){
    return request.post("findSpecial",query);
}
export function deleteSpecial(query){
    return request.post("deleteSpecial",query);
}
export function addUpdateSpecial(query){
    return request.post("addUpdateSpecial",query);
}
