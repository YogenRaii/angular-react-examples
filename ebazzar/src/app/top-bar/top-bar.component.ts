import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  cartItems = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
  }

}
