import { NgForm } from '@angular/forms';
import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { PostsService } from '../../services/posts.service';
import { CommentService } from 'src/app/services/comment.service';

import {  Pagination } from '../../models/pagination';
import { PostParams } from './../../models/postParams';
import { Post } from '../../models/post';
import { ShowComments } from 'src/app/models/showComments';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  pagination: Pagination;
  pageNumber  = 1;
  pageSize = 5;
  $posts: Post[] = [];
  $post : Post
  commentsCount: number;
  showComments: ShowComments;


  postParams : PostParams = {
    pageNumber: 1,
    pageSize: 5,
    search: ''
  }

  @ViewChild('postForm') postForm: NgForm;
  @ViewChild('commentForm') commentForm: NgForm;
  @ViewChild('filterForm') filterForm: NgForm;


  constructor(
    private postServices: PostsService,
    private commentService: CommentService,
    private toastr: ToastrService) {}

  ngOnChanges(): void {
    this.resetFilter();

  }


  ngOnInit(): void {
    this.getAllPosts();

  }


    //get all posts without pagination
    getAllPosts()  {
      this.postServices.getAllPosts(this.postParams).subscribe(posts => {
        this.$posts = posts;

      })
    }

    // get posts with Search Filter
    getPostsWithSearchFilter() {
      this.postServices.getAllPosts(this.postParams).subscribe(posts => {
        this.$posts = posts;
        this.filterForm.reset();


      })
    }

    // create new post
    createPost(postForm: NgForm) {
      this.postServices.createPost(postForm.value).subscribe(() => {
        this.postForm.reset();
        this.toastr.success('Post created successfully');
        this.getAllPosts();


      })
    }


    // create new comment
    createComment(commentForm: NgForm, post: Post) {
      const content = commentForm.value.content;

      this.commentService.createComment(commentForm.value, post).subscribe(() => {
        this.commentForm.reset();
        this.toastr.success('Comment created successfully');
        this.getAllPosts();

      // This two lines open the comments for the current post when submiting a new comment
        this.showComments = {show:true, id: post.id};
        this.postServices.showComments.next(this.showComments);

      })
    }

    resetFilter() {
      this.postServices.resetFilter().subscribe(posts => {
        this.$posts = posts;
        this.filterForm.reset();
      })
    }

  
}
