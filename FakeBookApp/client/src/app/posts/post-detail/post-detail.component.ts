import { PostsService } from 'src/app/services/posts.service';

import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent  {
  @Input() post!: Post;


  constructor(private postServices: PostsService) { }

   


}




