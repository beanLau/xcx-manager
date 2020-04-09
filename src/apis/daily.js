import request from "@/utils/request"

export function findDailys(query){
    return request.post("findDailys",query);
}
export function deleteDaily(query){
    return request.post("deleteDaily",query);
}
