import { Post } from './../models/post';
import { Component, OnInit, Input } from '@angular/core';
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



  constructor( private router: Router) { }



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
