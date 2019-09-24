import request from "@/utils/request"

export function getArticle(query){
    return request.post("findArticles");
}