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

      // 'id': new FormArray([new FormControl('1'), new FormControl('2')]),
      // 'name': new FormArray([new FormControl('Beans'), new FormControl('Soup')]),
      // 'weight': new FormArray([new FormControl('100'), new FormControl('125')]),
      // 'quantity': new FormArray([new FormControl('60'), new FormControl('20')])
      
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

  hitadd(){
    this.addclicked = false;
    const control = new FormControl(null);
    (<FormArray>this.form1.get('id')).push(control);
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
