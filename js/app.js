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
    this.totalCookies += arr[arrIndex].cookieCount;
    arrIndex++;
  }
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
  tableRowData += '<td>' + this.totalCookies + '</td>';
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

  // This statement leaves a blank cell in the header that vertically aligns with store names
  tableHeaderData += '<td>' + '' + '</td>';

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


// Call the respective function to display the header row in the table that shows every hour
displayHeader();

// Calculate and display cookie sales data for 1st and Pike Place store
var firstAndPikeStore = new CookieStore('1st and Pike', 23, 65, 6.3);
firstAndPikeStore.hourlyCustomerCookies = firstAndPikeStore.calcCookieCount();
firstAndPikeStore.displayCookieSales();

// Calculate and display cookie sales data for the store at SeaTac Airport
var seaTacAirport = new CookieStore('SeaTac Airport', 3, 24, 1.2);
seaTacAirport.hourlyCustomerCookies = seaTacAirport.calcCookieCount();
seaTacAirport.displayCookieSales();

// Calculate and display cookie sales data for the store at Seattle Center
var seattleCenter = new CookieStore('Seattle Center', 11, 38, 3.7);
seattleCenter.hourlyCustomerCookies = seattleCenter.calcCookieCount();
seattleCenter.displayCookieSales();

// Calculate and display cookie sales data for the store at Capitol Hill
var capitolHill = new CookieStore('Capitol Hill', 20, 38, 2.3);
capitolHill.hourlyCustomerCookies = capitolHill.calcCookieCount();
capitolHill.displayCookieSales();

// Calculate and display cookie sales data for the store at Alki
var alki = new CookieStore('Alki', 2, 16, 4.6);
alki.hourlyCustomerCookies = alki.calcCookieCount();
alki.displayCookieSales();
