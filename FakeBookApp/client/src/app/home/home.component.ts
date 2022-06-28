import { PostsService } from 'src/app/services/posts.service';
import { Post } from './../models/post';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { PaginatedResult, Pagination } from '../models/pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode = false;
  users: any;
  loginMode = false;
  posts : Post[] = [];



  constructor(private http: HttpClient, private router: Router) { }



  registerToggle() {
    this.registerMode = !this.registerMode
  }

  cancelRegisterMode($event: boolean){
    this.registerMode = $event;
  }

  aboutPage(){
    this.router.navigate(['/about']);

  }
}
