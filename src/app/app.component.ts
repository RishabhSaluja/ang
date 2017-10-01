import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  form1: FormGroup;

  //State of button clicked
  addclicked = false;
  editclicked = false;

  //temp variable to store previous values
  tempId = '';
  tempName = '';
  tempWeight = '';
  tempQuantity = '';
  tempPrice = '';

  //temp index of selected row
  tempindex;

  ngOnInit() {
    this.form1 = new FormGroup({
      // 'id': new FormArray([]),
      // 'name': new FormArray([], Validators.required),
      // 'weight': new FormArray([], Validators.required),
      // 'quantity': new FormArray([], Validators.required)

      'id': new FormArray([new FormControl('1'), new FormControl('2')], Validators.required),
      'name': new FormArray([new FormControl('Beans'), new FormControl('Soup')], Validators.required),
      'weight': new FormArray([new FormControl('100'), new FormControl('125')], Validators.required),
      'quantity': new FormArray([new FormControl('60'), new FormControl('20')], Validators.required),
      'price': new FormArray([new FormControl('100'), new FormControl('10')], Validators.required)
    });
  }

  //
  //Button to initiate add functionality 
  //
  addRow() {
    this.addclicked = true;
    this.tempId = '';
  }

  //
  //Button to cancel the last event
  //
  hitcancel() {
    this.addclicked = false;
    this.tempId = '';
  }

  //
  //Add new value to the row / FormArray
  //  
  hitadd(name, weight, quantity, price) {

    //Check input fields are empty or not
    if (name !== '' && weight !== '' && quantity !== '' && price !== '') {
      this.tempId = (this.ids.value.length + 1).toString(10);

      //To add input fields values to FormArray
      this.ids.push(new FormControl(this.tempId));
      this.names.push(new FormControl(name));
      this.weights.push(new FormControl(weight));
      this.quantities.push(new FormControl(quantity));
      this.prices.push(new FormControl(price));

      this.tempId = '';
      this.addclicked = false;
    }
  }

  //
  //method to temporary save the row values
  // &
  //fetch the current row index to edit
  //
  editRow(index: number) {
    this.tempName = this.names.value[index];
    this.tempWeight = this.weights.value[index];
    this.tempQuantity = this.quantities.value[index];
    this.tempPrice = this.prices.value[index];    
    
    this.editclicked = true;
    this.tempindex = index;
  }

  //
  //method to save the edited row elements
  //
  saveRow(index: number, name, weight, quantity, price) {

    this.names.at(index).setValue(name);
    this.weights.at(index).setValue(weight);
    this.quantities.at(index).setValue(quantity);
    this.prices.at(index).setValue(price);

    this.editclicked = false;
    this.tempindex = undefined;
  }

  //
  //method to delete a row from the table
  //
  delRow(index: number) {
    this.addclicked = false;

    this.ids.removeAt(index);
    this.names.removeAt(index);
    this.weights.removeAt(index);
    this.quantities.removeAt(index);
    this.prices.removeAt(index);

    //
    //Track the product id whenever a product
    //gets deleted
    //
    let i = 0;
    this.ids.controls.forEach(element => {
      i++;
      element.setValue(i.toString(10))
    });
  }

  //
  //get methods to return the form controls
  //
  get ids() {
    return this.form1.get('id') as FormArray;
  }
  get names() {
    return this.form1.get('name') as FormArray;
  }
  get weights() {
    return this.form1.get('weight') as FormArray;
  }
  get quantities() {
    return this.form1.get('quantity') as FormArray;
  }
  get prices() {
    return this.form1.get('price') as FormArray;
  }
}