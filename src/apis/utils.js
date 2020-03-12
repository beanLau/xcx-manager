import request from "@/utils/request"

export function uploadFile(query) {
    return request({
        url: "/upload",
        contentType: "multipart/form-data",
        method: "post",
        data: query
    });
}