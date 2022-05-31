import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PaginatedResult, Pagination } from '../models/pagination';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
    //posts: Post[] = [];
    pagination: Pagination;
    pageNumber  = 1;
    pageSize = 5;
    posts: Post[];

  constructor(private http: HttpClient, private PostServices: PostsService) { }

  ngOnInit(): void {
    //this.getllPosts();
  }

  getllPosts() {
    this.PostServices.getallPosts(this.pageNumber, this.pageSize).subscribe((respone:PaginatedResult<Post[]>) => {
      this.posts = respone.result;
      this.pagination = respone.pagination;
    });
  }


  getUsersPosts(id: number) {
    this.PostServices.getUsersPosts(id).subscribe(posts => {
      this.posts = posts;
    });
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.getllPosts();
  }


}
