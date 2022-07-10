

import { BehaviorSubject, map, observable, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { PostParams } from '../models/postParams';
import { ShowComments } from '../models/showComments';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = environment.apiUrl;
  posts: Post[] = [];
  postParams : PostParams


  public showComments = new BehaviorSubject<ShowComments>({show: false});

  constructor(private http: HttpClient) {}

  // get all posts
  getAllPosts(postParams: PostParams) {

    let params = new HttpParams();
    if(postParams.pageNumber != null && postParams.pageSize != null){
      params = params.append('pageNumber', postParams.pageNumber.toString());
      params = params.append('pageSize', postParams.pageSize.toString());
      params = params.append('search', postParams.search);
    }

    return this.http.get<Post[]>(`${this.baseUrl}post`, {
      observe: 'response',
      params
    }).pipe(
      map((res: HttpResponse<Post[]>) => {
        return res.body as Post[];
      })
    );

  }

 // create new post
  createPost(post: Post) : Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}Post`, post);
  }


  // get all users posts
   getUsersPosts(username: string)  {
    return this.http.get<Post[]>(`${this.baseUrl}Post/${username}`).pipe(
      tap((posts : Observable<Post[]> | any) => this.posts = posts));
    }

    // delete post
    deletePost(postId: number) : Observable<any> {
      return this.http.delete(`${this.baseUrl}Post/delete-post/${postId}`);
    }

  // update Post
   updatePost(post: Post) {
   return this.http.put(`${this.baseUrl}post`, post);

  }


  // reset filter
  resetFilter() {
    this.postParams = {
      pageNumber: 1,
      pageSize: 3,
      search: ''
    }
     return this.getAllPosts(this.postParams);
  }


}
