import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, Observable } from 'rxjs';
import { Member } from '../models/member';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  // get all members
  getMembers() : Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}users`)
  }

  // get member by username
  getMember(username: string) : Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}users/${username}`)
  }








}
