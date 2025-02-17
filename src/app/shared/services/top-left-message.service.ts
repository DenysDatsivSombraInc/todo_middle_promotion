import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private  messageService:MessageService) { }
  showTopLeft(severity:string,summary:string,detailText:string) {
    this.messageService.add({ severity: severity, summary:summary, detail: detailText, key: 'tl', life: 3000 });
  }
}
