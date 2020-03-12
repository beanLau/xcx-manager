import myReq from "@/utils/request"

export function uploadFile(query){
    return myReq.post("upload",query,'','multipart/form-data');
}
