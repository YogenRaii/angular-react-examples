import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor() { }

  addMessage(message) {
    this.messages.push(message);
  }

  clearMessages() {
    this.messages = [];
  }
}
