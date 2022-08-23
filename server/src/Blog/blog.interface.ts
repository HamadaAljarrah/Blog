import { Request } from "express";
import { BlogDocument } from "./blog.model";


export interface IBlog {
    title: BlogDocument['title'];
    snippet: BlogDocument['snippet'];
    content: BlogDocument['content'];
    auther: BlogDocument['auther'];
    category: BlogDocument['category'];
    readTime: BlogDocument['readTime'];
    createAt: BlogDocument['createAt'];
    edited?: BlogDocument['edited'];
    id?: BlogDocument['_id'];
}

export interface BlogReq extends Request<{ id: BlogDocument['_id'] }, {}, IBlog> {
}
// export interface BlogGetReq extends Request<{ id: BlogDocument['_id'] }> { }
// export interface BlogPutReq extends Request<{ id: BlogDocument['_id'] }> { }
// export interface BlogDeleteReq extends Request<{ id: BlogDocument['_id'] }> { }
