import request from "@/utils/request"

export function findComments(query){
    return request.post("findComments",query);
}
export function deleteComment(query){
    return request.post("deleteComment",query);
}
export function addUpdateComment(query){
    return request.post("addUpdateComment",query);
}
