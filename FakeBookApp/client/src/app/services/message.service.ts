import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { getPaginationHeaders, getPaginatedResult } from './paginationHelper';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  // get all messages for a user
  getMessages(pageNumber: number, pageSize: number, container: string){
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('container', container);

    return getPaginatedResult<Message[]>(this.baseUrl + 'message', params, this.http);
  }

  // get the thread messages
  getMessageThread(username: string){
    return this.http.get<Message[]>(`${this.baseUrl}message/thread/${username}`);
  }

  // send a message
  sendMessage(username:string, content: string){
    const createMessage = {recipientName: username, content};
    return this.http.post(`${this.baseUrl}message`, createMessage);

  }

  // delete a message
  deleteMessage(id: number){
    return this.http.delete(`${this.baseUrl}message/${id}`);
  }
}
