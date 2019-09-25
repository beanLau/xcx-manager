import request from "@/utils/request"

export function toLogin(query){
    return request.post("/login",query);
}