import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;
  private url = 'http://localhost:3000'; // your server local path

  public behaviourSubject = new BehaviorSubject<any>('');

  constructor() {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  joinRoom(data:any): void {
    this.socket.emit('join', data);
  }

  getJoinMsg(eventName:any): Observable<any>{
    console.log('eventName', eventName);
    
    return new Observable<any>(observer => {
      this.socket.on(eventName, (data:any) => {
        observer.next(data);
      });
      
      return () => {
        this.socket.disconnect();
      }
    });
  }


  sendMessage(data:any): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  // getStorage() {
  //   const storage: string = localStorage.getItem('chats');
  //   return storage ? JSON.parse(storage) : [];
  // }

  // setStorage(data) {
  //   localStorage.setItem('chats', JSON.stringify(data));
  // }

}
