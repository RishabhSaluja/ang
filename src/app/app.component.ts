import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms'
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  form1: FormGroup;
  addclicked = false;
  tempId = '';
  tempindex;
  editclicked = false;

  ngOnInit() {
    this.form1 = new FormGroup({
      'id': new FormArray([]),
      'name': new FormArray([]),
      'weight': new FormArray([]),
      'quantity': new FormArray([])
      
      
      // 'id': new FormArray([new FormControl('1'), new FormControl('2')]),
      // 'name': new FormArray([new FormControl('Beans'), new FormControl('Soup')]),
      // 'weight': new FormArray([new FormControl('100'), new FormControl('125')]),
      // 'quantity': new FormArray([new FormControl('60'), new FormControl('20')])

    });
  }
  addRow(){
    this.addclicked = true;
    this.tempId = '';
  }
  hitcancel(){
    this.addclicked = false;
    this.tempId = '';
  }
  hitadd(name, weight, quantity){
    this.tempId = (this.ids.value.length + 1).toString(10);

    this.ids.push(new FormControl(this.tempId));
    this.names.push(new FormControl(name));
    this.weights.push(new FormControl(weight));
    this.quantities.push(new FormControl(quantity));
    
    this.tempId = '';
    this.addclicked = false;

    console.log(this.form1);
  }

  editRow(index: number){
    this.editclicked = true;
    this.tempindex = index;
    
    //this.ids.at(index).patchValue(null);
  }

  saveRow(index: number, name, weight, quantity){
    
        this.names.at(index).setValue(name);
        this.weights.at(index).setValue(weight);
        this.quantities.at(index).setValue(quantity);
    
        this.editclicked = false;
        this.tempindex = undefined;
      }

  delRow(index: number){
    this.addclicked = false;
    
    this.ids.removeAt(index);
    this.names.removeAt(index);
    this.weights.removeAt(index);
    this.quantities.removeAt(index);

    let i = 0;
    this.ids.controls.forEach(element => {
      i++;
      element.setValue(i.toString(10))
    });
  }
  get ids(){
    return this.form1.get('id') as FormArray;
  }
  get names(){
    return this.form1.get('name') as FormArray;
  }
  get weights(){
    return this.form1.get('weight') as FormArray;
  }
  get quantities(){
    return this.form1.get('quantity') as FormArray;
  }
}