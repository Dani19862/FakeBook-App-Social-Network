import { PostsService } from 'src/app/services/posts.service';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-users-posts',
  templateUrl: './users-posts.component.html',
  styleUrls: ['./users-posts.component.css']
})
export class UsersPostsComponent {

  constructor(private postService: PostsService) { }
  @Input() post!: Post;




}
