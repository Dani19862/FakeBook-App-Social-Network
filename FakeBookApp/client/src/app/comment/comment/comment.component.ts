import { Comment } from './../../models/comment';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Member } from 'src/app/models/member';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() { }

  @Input() comment!: Comment | any;
  @Input () post!: Post;
  





  ngOnInit() {

  }

}
