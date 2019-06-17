'use strict';

const http = new XMLHttpRequest;
const body = document.querySelector('.table-container');
const tBody = document.getElementsByTagName('tbody')[0];
const tableBody = document.querySelector('.table-body');
const table = document.querySelector('table');
const buttonSend = document.querySelector('.send');
const form = document.querySelector('form-container');
const columns = ['attr_name', 'city', 'category', 'price', 'longitude', 'lattitude', 'recommended_age', 'duration'];

function fillTable(data) {
  for (let i = 0; i < data.length; i++) { //row
    let row = document.createElement('tr');
    for (let j = 0; j < columns.length; j++) {  //column
      let tableData = document.createElement('td');
      tableData.innerText = data[i][columns[j]];
      row.appendChild(tableData);
    };
    let button = document.createElement('button');
    button.innerText = 'Edit';
    button.setAttribute('class', 'edit');
    button.onclick = (e) => {
      console.log(i, 'edit');
      setFormData(data[i]);
    };
    row.appendChild(button);
    table.appendChild(row);
  };
};

window.onload = () => {
  http.open('GET', '/attractions');
  http.onload = () => {
    let dataFromDb = JSON.parse(http.responseText);
    //console.log(dataFromDb);
    fillTable(dataFromDb);
  };
  http.send();
};

let responseObj = {
  'attr_name': '',
  'city': '',
  'category': '',
  'price': '',
  'lattitude': '',
  'longitude': '',
  'recommended_age': '',
  'duration': ''
};

buttonSend.onclick = (e) => {
  //e.preventDefault();
  http.open('POST', `/add`);
  http.onload = () => {
    let data = http.responseText;
    console.log(data);
    
    /* FILL OBJECT VALUES, KEYS GIVEN 
        let inputList = document.getElementsByTagName('input');
    console.log(inputList);
    
    for (let i = 0; i < inputList.length; i++) {
      let objKey = Object.keys(responseObj)[i];
      responseObj[objKey] = inputList[i].value;
    }*/
    console.log(getFormData());
  };
  http.setRequestHeader('Content-Type', 'application/json');
  http.send(JSON.stringify(getFormData()));
};

function getFormData() {
  let returnObj = {
    attr_name: document.getElementById('name').value,
    city: document.getElementById('city').value,
    price: document.getElementById('price').value,
    longitude: document.getElementById('longitude').value,
    lattitude: document.getElementById('lattitude').value,
    category: document.getElementById('category').value,
    duration: document.getElementById('duration').value,
    recommended_age: document.getElementById('rec-age').value
  }
  let rowId = document.getElementById('row-id');

  if (rowId.value !== '')  {
    returnObj.id = rowId.value;
    rowId.value = '';
  }
  return returnObj;
};

function setFormData (row) {
  document.getElementById('name').value = row.attr_name;
  document.getElementById('city').value = row.city;
  document.getElementById('price').value = row.price; 
  document.getElementById('longitude').value = row.longitude;
  document.getElementById('lattitude').value = row.lattitude;
  document.getElementById('category').value = row.category;
  document.getElementById('duration').value = row.duration;
  document.getElementById('rec-age').value = row.recommended_age;
  document.getElementById('row-id').value = row.id;
};