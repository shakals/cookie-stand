'use strict';

var locationOpenHour = 6, locationCloseHour = 20;
var locationForm = document.getElementById('location_input_form');

/* Constructor function for all stores */
function CookieStore(store){
  this.locationName = store.locationName;
  this.minHourlyCustomers = store.minHourlyCustomers;
  this.maxHourlyCustomers = store.maxHourlyCustomers;
  this.avgCookiesPerCustomer = store.avgCookiesPerCustomer;
  this.hourlyCustomerCookies = [];
  this.totalCookies = 0;
}


/* Create a prototype function to calculate Cookie count for each hour. It generates random number of customers and calculates cookie count for each hour. */
CookieStore.prototype.calcCookieCount = function(){
  // Declare an array that will later become an array of objects containing Customer and Cookie count for each hour
  var arr = [];
  var arrIndex = 0;

  for (var i = locationOpenHour + 1; i <= locationCloseHour; i++){
    // The following statements will generate random numbers inclusive of both boundaries.
    var randomNumber = Math.random();
    var tempCustCount = Math.floor(randomNumber * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;

    console.log('Min, Max customers, Math random, Floor calc, tempCustCount=', this.minHourlyCustomers, this.maxHourlyCustomers, randomNumber, Math.floor(randomNumber * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)), tempCustCount);

    arr[arrIndex] = {
      hour: ((i <= 12) ? i:i%12) + ((i < 12) ? ' AM':' PM'), // Assign the hour (in 12 hour format) to this property
      customerCount: tempCustCount, // Random customer count generated above
      cookieCount: Math.ceil(tempCustCount * this.avgCookiesPerCustomer) // Cookie count is calculated by multiplying Customer Count with Average cookies sold per customer and then rounding upwards to nearest integer
    };

    console.log('Cookie array values:');
    console.log (arr[arrIndex]);
    // Keep a running total of total cookies sold in the store
    this.totalCookies += arr[arrIndex].cookieCount;

    // Keep populating this array to display column totals in the table. The 'isNaN()' function is used to avoid 'NaN' error for the very first iteration
    hourlyTotalArray[arrIndex] = (isNaN(hourlyTotalArray[arrIndex]) ? 0:hourlyTotalArray[arrIndex]) + arr[arrIndex].cookieCount;
    arrIndex++;
  }
  // Calculate the grand total
  hourlyTotalArray[arrIndex] = (isNaN(hourlyTotalArray[arrIndex]) ? 0:hourlyTotalArray[arrIndex]) + this.totalCookies;
  return arr;
};


/* This prototype function dynamically generates and populates the table (hourly cookie count) for each store */
CookieStore.prototype.displayCookieSales = function(){
  var tableBody = document.getElementById('tablebody');
  var tableRow, tableRowData = '';

  tableRowData += '<td>' + this.locationName + '</td>';
  for (var i = 0; i < this.hourlyCustomerCookies.length; i++) {
    tableRowData += '<td>' + this.hourlyCustomerCookies[i].cookieCount + '</td>';
  }
  tableRowData += '<td class=\'totalCell\'>' + this.totalCookies + '</td>';
  console.log('tableRowData =', tableRowData);
  tableRow = document.createElement('tr');
  tableRow.innerHTML = tableRowData; //Populate hourly cookie data

  if ((tableBody.hasChildNodes())&&(tableBody.lastChild.firstChild.className==='totalCell')) {
    console.log('Totals row exists already and will be replaced..........');
    tableBody.replaceChild(tableRow,tableBody.lastChild);
  }
  else{
    console.log('Appending Child..........');
    tableBody.appendChild(tableRow);
  }

  console.log('tableBody =', tableBody);
};


/* This function is used to display the header of the Cookie Sales table */
function displayHeader(){
  var tableHeader = document.getElementById('tableheader');
  var tableRow, tableHeaderData = '';

  // This statement leaves a blank cell in the header that vertically aligns with store names
  tableHeaderData += '<td>' + '' + '</td>';

  // Display all hours
  for (var i = locationOpenHour + 1; i <= locationCloseHour; i++) {
    var hour = ((i <= 12) ? i:i%12) + ((i < 12) ? ' AM':' PM');
    tableHeaderData += '<td>' + hour + '</td>';
  }
  tableHeaderData += '<td>Daily Location Total</td>';
  console.log('tableHeaderData =', tableHeaderData);
  tableRow = document.createElement('tr');
  tableRow.innerHTML = tableHeaderData; //Populate hourly cookie data
  tableHeader.appendChild(tableRow);
  console.log('tableHeader =', tableHeader);
}


/* This function is used to display the hourly cookie sales totals across all stores */
function displayHourlyTotals(){
  var tableBody = document.getElementById('tablebody');
  var tableRow, tableRowData = '';

  tableRowData += '<td class=\'totalCell\'>Totals</td>';
  for (var i = 0; i < hourlyTotalArray.length; i++) {
    tableRowData += '<td class=\'totalCell\'>' + hourlyTotalArray[i] + '</td>';
  }

  console.log('tableRowData =', tableRowData);
  tableRow = document.createElement('tr');
  tableRow.innerHTML = tableRowData;
  tableBody.appendChild(tableRow);
  console.log('tableBody =', tableBody);
}



var hourlyTotalArray = [0];

// Call the respective function to display the header row in the table that shows every hour
displayHeader();

function processFormData(event){
  event.preventDefault();

  var tempstore = {
    locationName: event.target.locationName.value,
    minHourlyCustomers: Number(event.target.minHourlyCustomers.value),
    maxHourlyCustomers: Number(event.target.maxHourlyCustomers.value),
    avgCookiesPerCustomer: Number(event.target.avgCookiesPerCustomer.value)
  };
  console.log('tempstore values =', tempstore);

  var store = new CookieStore(tempstore);
  store.hourlyCustomerCookies = store.calcCookieCount();
  store.displayCookieSales();

  // Display hourly cookie sales totals across all stores
  displayHourlyTotals();
  locationForm.reset();
}

locationForm.addEventListener('submit', processFormData);



