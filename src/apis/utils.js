import myReq from "@/utils/request"

export function uploadFile(query){
    return myReq.post("/api/upload",query,'','multipart/form-data');
}
