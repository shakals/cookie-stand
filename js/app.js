'use strict';

var locationOpenHour = 6, locationCloseHour = 20;

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
    // The following statement will generate random numbers inclusive of both boundaries.
    var tempCustCount = Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1)) + this.minHourlyCustomers;
    arr[arrIndex] = {
      hour: ((i <= 12) ? i:i%12) + ((i < 12) ? ' AM':' PM'), // Assign the hour (in 12 hour format) to this property
      customerCount: tempCustCount, // Random customer count generated above
      cookieCount: Math.ceil(tempCustCount * this.avgCookiesPerCustomer) // Cookie count is calculated by multiplying Customer Count with Average cookies sold per customer and then rounding upwards to nearest integer
    };
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
  tableBody.appendChild(tableRow);
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

// Create an array of objects to store details about each location
var storeList = [
  {
    locationName: '1st and Pike',
    minHourlyCustomers: 23,
    maxHourlyCustomers: 65,
    avgCookiesPerCustomer: 6.3
  },
  {
    locationName: 'SeaTac Airport',
    minHourlyCustomers: 3,
    maxHourlyCustomers: 24,
    avgCookiesPerCustomer: 1.2
  },
  {
    locationName: 'Seattle Center',
    minHourlyCustomers: 11,
    maxHourlyCustomers: 38,
    avgCookiesPerCustomer: 3.7
  },
  {
    locationName: 'Capitol Hill',
    minHourlyCustomers: 20,
    maxHourlyCustomers: 38,
    avgCookiesPerCustomer: 2.3
  },
  {
    locationName: 'Alki',
    minHourlyCustomers: 2,
    maxHourlyCustomers: 16,
    avgCookiesPerCustomer: 4.6
  }];

var hourlyTotalArray = [0];

// Call the respective function to display the header row in the table that shows every hour
displayHeader();


// Loop through the store list, calculate and display cookie count in sales.html
for (var i=0; i<storeList.length; i++){
  var store = new CookieStore(storeList[i]);
  store.hourlyCustomerCookies = store.calcCookieCount();
  store.displayCookieSales();
  //hourlyTotalArray.push(store.hourlyCustomerCookies);
}

// Display hourly cookie sales totals across all stores
displayHourlyTotals();
