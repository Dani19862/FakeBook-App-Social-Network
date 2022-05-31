import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { PaginatedResult } from '../models/pagination';
import { PostParams } from '../models/postParams';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = environment.apiUrl;
  posts : Post[] = [];
  postParams : PostParams
  paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();



  constructor(private http: HttpClient) { }

  getPost(id: number) {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  getallPosts(page?:number, itemsPerPage?:number) : Observable <PaginatedResult<Post[]>> {

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Post[]>(`${this.baseUrl}posts`,
     {observe: 'response', params})
    .pipe(
      map(response => {
        this.paginatedResult.result = response.body as Post[];
        if(response.headers.get('Pagination') != null){
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') || '');
        }
        return this.paginatedResult;
      })
    );
  }

  getUsersPosts(id: number) {
    return this.http.get<Post[]>(`${this.baseUrl}/posts/user/${id}`);
  }

  createPost(post: Post) {
    return this.http.post(this.baseUrl + 'posts', post);
  }

  updatePost(id: number, post: Post) {
    return this.http.put(this.baseUrl + 'posts/' + id, post);
  }

  deletePost(id: number) {
    return this.http.delete(this.baseUrl + 'posts/' + id);
  }



}
