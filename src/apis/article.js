import request from "@/utils/request"

export function addUpdateArticle(query){
    return request.post("addUpdateArticle",query);
}

export function getArticle(query){
    return request.post("findArticles",query);
}

export function enableArticle(query){
    return request.post("enableArticle",query);
}

export function deleteArticle(query){
    return request.post("deleteArticle",query);
}

export function findAllTags(query){
    return request.post("findAllTags",query);
}

export function findAllTypes(query){
    return request.post("findAllTypes",query);
}