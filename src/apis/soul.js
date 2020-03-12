import request from "@/utils/request"

export function findSouls(query){
    return request.post("findSouls",query);
}

export function deleteSoul(query){
    return request.post("deleteSoul",query);
}

export function addUpdateSoul(query){
    return request.post("addUpdateSoul",query);
}

export function isTopSoul(query){
    return request.post("isTopSoul",query);
}
