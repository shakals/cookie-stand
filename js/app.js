'use strict';

var locationOpenHour = 6, locationCloseHour = 20;

/* Constructor function for all stores */
function CookieStore(locationName, minHourlyCustomers, maxHourlyCustomers, avgCookiesPerCustomer){
  this.locationName = locationName;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.hourlyCustomerCookies = [];
  this.totalCookies = 0;
}


/* Create a prototype function to calculate Cookie count for each hour. It generates random number of customers and calculates cookie count for each hour. */
CookieStore.prototype.calcCookieCount = function(){
  // Declare an array that will later become an array of objects containing Customer and Cookie count for each hour
  var arr = [];
  var arrIndex = 0;

  for (var i = locationOpenHour + 1; i <= locationCloseHour; i++){
    // The following statement will generate random numbers inclusive of both boundaries.
    var tempCustCount = Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
    arr[arrIndex] = {
      hour: ((i <= 12) ? i:i%12) + ((i < 12) ? ' AM':' PM'), // Assign the hour (in 12 hour format) to this property
      customerCount: tempCustCount, // Random customer count generated above
      cookieCount: Math.ceil(tempCustCount * this.avgCookiesPerCustomer) // Cookie count is calculated by multiplying Customer Count with Average cookies sold per customer and then rounding upwards to nearest integer
    };
    arrIndex++;
  }
  return arr;
};


/* This prototype function dynamically generates and populates the table (hourly cookie count) for each store */
CookieStore.prototype.displayCookieSales = function(){
  var tableBody = document.getElementById('tablebody');
  var tableRow, tableRowData = '';

  for (var i = 0; i < this.hourlyCustomerCookies.length; i++) {
    tableRowData += '<td>' + this.hourlyCustomerCookies[i].cookieCount + '</td>';
  }
  console.log('tableRowData =', tableRowData);
  tableRow = document.createElement('tr');
  tableRow.innerHTML = tableRowData; //Populate hourly cookie data
  tableBody.appendChild(tableRow);
  console.log('tableBody =', tableBody);
};


/* This function is used to display the header of the Cookie Sales table */
function displayHeader(){
  var tableHeader = document.getElementById('tableheader');
  var tableRow, tableHeaderData = '';

  for (var i = locationOpenHour + 1; i <= locationCloseHour; i++) {
    var hour = ((i <= 12) ? i:i%12) + ((i < 12) ? ' AM':' PM');
    tableHeaderData += '<td>' + hour + '</td>';
  }
  console.log('tableHeaderData =', tableHeaderData);
  tableRow = document.createElement('tr');
  tableRow.innerHTML = tableHeaderData; //Populate hourly cookie data
  tableHeader.appendChild(tableRow);
  console.log('tableHeader =', tableHeader);
}


displayHeader();
var firstAndPikeStore = new CookieStore('1st and Pike', 23, 65, 6.3);
firstAndPikeStore.hourlyCustomerCookies = firstAndPikeStore.calcCookieCount();
firstAndPikeStore.displayCookieSales();



