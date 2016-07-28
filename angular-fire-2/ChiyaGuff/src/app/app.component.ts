import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Subject} from 'rxjs/Subject';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css']
})
export class AppComponent {
	items: FirebaseListObservable<any[]>;
	messages: FirebaseListObservable<any[]>;
	subjectSize: Subject<any>;
	//item : FirebaseObjectObservable<any>;
  constructor(public af: AngularFire) {
  	this.subjectSize = new Subject();
  	this.items = af.database.list('/messages');
    this.messages = af.database.list('/messages',{
    	query: {
    		orderByChild : 'size',
    		equalTo : this.subjectSize
    	}
    });
  }
  filterBy(size: string){
  	this.subjectSize.next(size);
  }
  add(newName: string) {
    this.items.push({ text: newName });
  }
  update(key: string, newSize: string) {
    this.items.update(key, { size: newSize });
  }
  deleteItem(key: string) {    
    this.items.remove(key); 
  }
  deleteEverything() {
    this.items.remove();
  }

  login(){
  	this.af.auth.login({ email: 'email', password: 'pass' });
  }

	title = 'app works!';
}
