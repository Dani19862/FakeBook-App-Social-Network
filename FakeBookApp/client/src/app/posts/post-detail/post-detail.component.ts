import { Comment } from './../../models/comment';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommentComponent } from 'src/app/comment/comment/comment.component';



@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent  {
  @Input() post!: Post;





  // bsModalRef: BsModalRef;
  // constructor(private modalService: BsModalService) {}


  // openModal(){
  //   this.bsModalRef = this.modalService.show(CommentComponent, {class: 'modal-lg'});
  //   this.bsModalRef.content.post = this.post;
  // }




}




