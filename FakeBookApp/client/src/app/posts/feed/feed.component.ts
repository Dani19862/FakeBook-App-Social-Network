import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginatedResult, Pagination } from '../../models/pagination';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  pagination: Pagination;
  pageNumber  = 1;
  pageSize = 5;
  posts: Post[];
  post : Post
  @ViewChild('postForm') postForm: NgForm;



  constructor(private PostServices: PostsService) {
      // this.accounteService.currentUser$.pipe(take(1)).subscribe(user => this.user = user as User);
   }

  ngOnInit(): void {
    this.getllPosts();
  }

    //get all posts without pagination
    getllPosts() {
      this.PostServices.getallPosts().subscribe(post => {
        this.posts = post;
        console.log(this.posts);
      })
    }

    // create new post
    createPost(postForm: NgForm) {
      this.PostServices.createPost(postForm.value).subscribe(() => {
        this.postForm.reset();
        this.getllPosts();

      })
    }


    getPost(id: number) {
      this.PostServices.getPost(id).subscribe(post => {
        this.post = post;
      });
    }


    // get all posts with pagination
    // getllPosts() {
    //   this.PostServices.getallPosts(this.pageNumber, this.pageSize).subscribe((response:PaginatedResult<Post[]>) => {
    //     this.posts = response.result;
    //     this.pagination = response.pagination;
    //   });

  // pageChanged({page}: any) {
  //   this.pageNumber = page;
  //   this.getllPosts();
  // }



}
