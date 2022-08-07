import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import {io} from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'socket-room-angular';

  public room: any;
  public name:any;
  joineeName:any
  isTrue: boolean = false;
  public messageArray: any = [];
  public newMessage:any;

  

  constructor(private chatService: ChatService){}
  ngOnInit() {

  }
  sendMessage(){
    this.chatService.sendMessage({user: this.name, room: this.room, message: this.newMessage});
    this.newMessage = '';
  }

  enter(){
    console.log('user', this.name,"  ", "room", this.room);
    this.isTrue = true;

    this.chatService.joinRoom({user: this.name, room: this.room});

    this.chatService.getJoinMsg('userJoin').subscribe((data:any) => {
      console.log('data', data);
      this.joineeName=data;
    })
    this.chatService.getMessage()
    .subscribe((data: { user: string, room: string, message: string }) => {
      if (this.room) {
            this.messageArray.push(data);
      }
    });
  }

}
