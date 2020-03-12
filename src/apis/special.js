import request from "@/utils/request"

export function findSpecials(query){
    return request.post("findSpecials",query);
}
export function deleteSpecial(query){
    return request.post("deleteSpecial",query);
}
export function addUpdateSpecial(query){
    return request.post("addUpdateSpecial",query);
}
