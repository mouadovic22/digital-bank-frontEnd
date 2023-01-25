import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  newCustomerFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private customerService: CustomerService, private router: Router) {}
  handleSaveCustomer() {
    let customer : Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomers(customer).subscribe({
      next : (data) => {alert("Customer saved successfully");
      this.router.navigateByUrl("/customers");
      },
      error : (err) => {console.log(err)}
    });
  }
  ngOnInit() : void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null , [Validators.email, Validators.required])
    })
  }

}
