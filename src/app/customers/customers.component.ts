import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormGroup , FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

 customers! : Observable<Array<Customer>>;
 errorMessage! : string ;
 searchFormGroup! : FormGroup;

 handleSearchCustomers() {
    let kw = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
 }

 handleDeleteCustomer(customer : Customer) {
  let conf = confirm("are you sure you want to delete !");
  
  if(!conf) return;

  this.customerService.deleteCustomers(customer.id).subscribe({
    next : (data) => {
      this.customers = this.customers.pipe(
        map(data => {
          let index = data.indexOf(customer);
          data.slice(index, 1);
          return data;
        })
      )
    },
    error : (err) => {console.log(err)}
  })
 }

  constructor(private customerService : CustomerService, private fb : FormBuilder) {}
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    })
   this.handleSearchCustomers();
  }

}
