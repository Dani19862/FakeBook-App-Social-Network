
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent  {
  @Input() post!: Post;



}




