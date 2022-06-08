import { PostsService } from 'src/app/services/posts.service';
import { Post } from './../models/post';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { PaginatedResult, Pagination } from '../models/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;
  loginMode = false;
  posts : Post[] = [];



  constructor(private http: HttpClient, private postService: PostsService) { }

  ngOnInit(): void {
    //this.getUsers();
    //this.postService.getallPosts();

  }

  registerToggle() {
    this.registerMode = !this.registerMode
  }

  ///  NOT USED
  // getUsers(){
  //   this.http.get('https://localhost:5001/api/users')
  //   .subscribe(
  //     users => this.users = users,
  //     error => console.log(error))
  // }

  cancelRegisterMode($event: boolean){
    this.registerMode = $event;
  }
}
