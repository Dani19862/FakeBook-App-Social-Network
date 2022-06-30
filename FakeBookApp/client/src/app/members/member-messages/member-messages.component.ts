import { NgForm } from '@angular/forms';
import { MessageService } from './../../services/message.service';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent {

  constructor(private messageService: MessageService) { }

  @Input() username: string;
  @Input() messages: Message[];

  messageContent: string;

  sendMessage(form: NgForm) {
    this.messageService.sendMessage(this.username, this.messageContent).subscribe((message) => {
      this.messages.unshift(message as Message);
      form.reset();
    });
  }

}
