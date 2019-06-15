import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems;
  checkoutForm;

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService) {
    this.cartItems = this.cartService.getItems();

    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(customerData) {
    console.log('Process data: ', customerData);

    this.cartItems = this.cartService.clearCart();

    this.checkoutForm.reset();
  }
}
