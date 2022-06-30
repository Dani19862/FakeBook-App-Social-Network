import { Message } from './../models/message';
import { MessageService } from './../services/message.service';

import { Component, OnInit } from '@angular/core';
import { Pagination } from '../models/pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  pagination : Pagination;
  container : string = 'Unread';
  pageNumber: number = 1;
  pageSize: number = 5;

  loading = false;


  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    //this.getMessages();
  }


 // get all messages for a user
  getMessages(){
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize,this.container).subscribe(
      response => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      });

  }

  pageChanged(event: any): void {
    if(this.pageNumber != event.page){
      this.pageNumber = event.page;
      this.getMessages();
    }
  }

  // delete a message
  deleteMessage(id: number){
    this.messageService.deleteMessage(id).subscribe(() =>{
      this.messages.splice(this.messages.findIndex(m => m.id == id), 1);
    })
  }




}
