import { Http } from '@angular/http';
import { NgModule } from '@angular/core';
import { PostService } from './services/post.service';
import { Component, OnInit } from '@angular/core';
declare var firebase: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //Array to store Product details
  server = [];

  //Index of selected row
  tempindex;
  
  //temp variable to store previous values
  tempId = '';
  tempName = '';
  tempWeight = '';
  tempQuantity = '';
  tempPrice = '';

  //State of button clicked
  addclicked = false;
  editclicked = false;

  ngOnInit(): void {
    //To fetch data from database
    this.getData();
  }

  //
  //Push Data to server Array
  //
  getData() {
    firebase.database().ref("/").on('child_added', (snapshot) => {
      this.server.push(snapshot.val());
    });
  }

  //
  //Add new value to the row / FormArray
  //
  createPost(input_name, input_weight, input_quantity, input_price) {
    if (input_name !== '' && input_weight !== '' && input_quantity !== '' && input_price !== '') {
      this.tempId = (this.server.length + 1).toString(10);
      firebase.database().ref('/').push({
        id: this.tempId,
        name: input_name,
        weight: input_weight,
        quantity: input_quantity,
        price: input_price
      });
      this.tempId = '';
      this.addclicked = false;
    }
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
  //method to temporary save the row values
  // &
  //fetch the current row index to edit
  //
  editRow(index: number) {
    this.tempName = this.server[index].name;
    this.tempWeight = this.server[index].weight;
    this.tempQuantity = this.server[index].quantity;
    this.tempPrice = this.server[index].price;

    this.editclicked = true;
    this.tempindex = index;
  }

  //
  //method to save the edited row elements
  //
  saveRow(index: number, input_name, input_weight, input_quantity, input_price) {
    index = index + 1;
    
    //Find the key of currently
    //selected row in the database
    var ref = firebase.database().ref("/");
    ref.orderByChild("id").equalTo(index.toString(10)).on("child_added", function (snapshot) {
      var k = snapshot.key;

      var refSave = firebase.database().ref("/" + k);
      refSave.ref.update({
        name: input_name,
        weight: input_weight,
        quantity: input_quantity,
        price: input_price
      });
      console.log("Updated");
    });

    this.server = [];
    this.getData();

    this.editclicked = false;
    this.tempindex = undefined;
  }

  //
  //method to delete a row from the table
  //
  delRow(index: number) {
    index = index + 1;

    var ref = firebase.database().ref("/");
    ref.orderByChild("id").equalTo(index.toString(10)).on("child_added", function (snapshot) {
      var k = snapshot.key;
      var refDel = firebase.database().ref("/" + k);
      refDel.ref.ref.remove().then(function () {
        console.log("Deleted");
      }).catch(function (error) {
        console.log("Error: " + error.message);
      });
    });

    //
    //Track the product id whenever a product
    //gets deleted
    //
    var qref = firebase.database().ref("/");
    let i = 0;
    qref.ref.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var idkey = childSnapshot.key;
        var rSave = firebase.database().ref("/" + idkey);
        console.log(rSave);
        i++;
        rSave.ref.update({
          id: i.toString(10)
        });
      });
    });

    this.server = [];
    this.getData();

    this.addclicked = false;
  }
}