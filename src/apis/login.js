import request from "@/utils/request"

export function toLogin(query){
    return request.post("user/login",query);
}