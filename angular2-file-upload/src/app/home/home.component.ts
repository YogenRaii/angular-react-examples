import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

export class User {
	public id: number;
	public name: string;
}

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
	constructor(private userService: UserService) {}

	users: User[] = [];

	ngOnInit() {
		this.userService.getUsers().subscribe(data => {
			this.users = data.users;
			this.users.sort(function sortUsers(user1, user2) {
				if(user1.name < user2.name) {
					return -1;
				} else if(user1.name > user2.name) {
					return 1;
				} else {
					return 0;
				}
			})
		});
	}
}

