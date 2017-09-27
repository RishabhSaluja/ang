import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  form1: FormGroup;
  addclicked = false;

  ngOnInit() {
    this.form1 = new FormGroup({
      'id': new FormArray([]),
      'name': new FormArray([]),
      'weight': new FormArray([]),
      'quantity': new FormArray([])
    });
  }
  addRow(){
    this.addclicked = true;
  }
  getvisible(){
    return this.addclicked === false ? 'inline-block' : 'none';
  }
  hitcancel(){
    this.addclicked = false;
  }
  //hitadd()id, name, weight, quantity:HTMLInputElement){
    hitadd(){
    this.addclicked = false;
    const control = new FormControl(null);
    (<FormArray>this.form1.get('id')).insert((this.form1.get('id').value+1),control);
    // this.ids.push(new FormControl(id.value));
    // this.names.push(new FormControl(name.value));
    // this.weights.push(new FormControl(weight.value));
    // this.quantities.push(new FormControl(quantity.value));
  }

  editRow(){    
  }

  delRow(id, name, weight, quantity:FormControl){
    let index1 = this.ids.controls.indexOf(id);
    let index2 = this.names.controls.indexOf(name);
    let index3 = this.weights.controls.indexOf(weight);
    let index4 = this.quantities.controls.indexOf(quantity);

    this.ids.removeAt(index1);
    this.names.removeAt(index2);
    this.weights.removeAt(index3);
    this.weights.removeAt(index4);
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
