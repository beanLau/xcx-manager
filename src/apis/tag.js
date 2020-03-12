import request from "@/utils/request"

export function findTags(query){
    return request.post("findTags",query);
}
export function deleteTag(query){
    return request.post("deleteTag",query);
}
export function addUpdateTag(query){
    return request.post("addUpdateTag",query);
}
