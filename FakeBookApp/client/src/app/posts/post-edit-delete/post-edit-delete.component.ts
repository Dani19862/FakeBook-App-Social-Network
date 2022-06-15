import { Component, HostListener, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-edit-delete',
  templateUrl: './post-edit-delete.component.html',
  styleUrls: ['./post-edit-delete.component.css']
})
export class PostEditDeleteComponent implements OnInit {

  constructor(private postService: PostsService) { }

  @Input() post!: Post;
  @Input() allPosts: Post[];
  @Input() comments : Comment[] = [];



  @ViewChild('editForm') editForm: NgForm

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if (this.editForm.dirty){
      $event.returnValue = true;
    }
  }


  ngOnInit() {

  }
    // delete post
    deletePost(postId: number) {
      this.postService.deletePost(postId).subscribe(() => {
        this.allPosts.splice(this.allPosts.findIndex(post => post.id === postId ), 1);
      });
    }


    // edit post
    editPost(post: Post) {
      this.postService.updatePost(post).subscribe(() => {
        this.postService.getUsersPosts(post.username);
      });
    }
}


