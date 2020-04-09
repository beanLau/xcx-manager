import request from "@/utils/request"

export function addUpdateQuestion(query){
    return request.post("addUpdateQuestion",query);
}
export function findQuestions(query){
    return request.post("findQuestions",query);
}
export function recommendQuestion(query){
    return request.post("recommendQuestion",query);
}
export function deleteQuestion(query){
    return request.post("deleteQuestion",query);
}

