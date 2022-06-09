import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PaginatedResult, Pagination } from '../../models/pagination';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  pagination: Pagination;
  pageNumber  = 1;
  pageSize = 5;
  posts: Post[] = [];
  comments: Comment[] = [];
  post : Post


  @ViewChild('postForm') postForm: NgForm;

  // @Input() postForComment!: Post;
  // @Input() comment: Comment;

  constructor(private PostServices: PostsService, private commentService: CommentService) {
      // this.accounteService.currentUser$.pipe(take(1)).subscribe(user => this.user = user as User);
   }

  ngOnInit(): void {
    this.getllPosts();
  }

    //get all posts without pagination
    getllPosts()  {
       this.PostServices.getallPosts().subscribe(posts => {
          this.posts = posts;
          console.log(this.posts);
        });
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

    // Get Comments for a post

    getComments(postId: number) {
      this.commentService.getComments(postId).subscribe(result => {
        this.comments = result;
        console.log(this.comments);
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
