'use strict';

/* This function accepts a time range (Opening and Closing time of store in hours), minimum and maximum limit for number of customers during any hour for that store and Average Cookies sold per customer.
   Then, it generates random number of customers and calculates cookie count for each hour. */
function calcCookieCount(startHour, endHour, minCustomers, maxCustomers, avgCookiesPerCustomer){
  // Declare an array that will later become an array of objects containing Customer and Cookie count for each hour
  var arr = [];
  var arrIndex = 0;

  for (var i = startHour + 1; i <= endHour; i++){
    // The following statement will generate random numbers inclusive of both boundaries.
    var tempCustCount = Math.floor(Math.random() * (maxCustomers - minCustomers + 1)) + minCustomers;
    arr[arrIndex] = {
      hour: ((i <= 12) ? i:i%12) + ((i < 12) ? ' AM':' PM'), // Assign the hour (in 12 hour format) to this property
      customerCount: tempCustCount, // Random customer count generated above
      cookieCount: Math.ceil(tempCustCount * avgCookiesPerCustomer) // Cookie count is calculated by multiplying Customer Count with Average cookies sold per customer and then rounding upwards to nearest integer
    };
    arrIndex++;
  }
  return arr;
}

/* This function dynamically generates and populates list items (hourly cookie count) for the Unordered list (Store) passed as parameter */
function displaySalesProjections(ulID, objCookieData){
  var ulStore = document.getElementById(ulID); //Unordered List for the Store
  var liHourlyData;

  for (var i = 0; i < objCookieData.hourlyCustomerCookies.length; i++) {
    liHourlyData = document.createElement('li');
    liHourlyData.textContent = objCookieData.hourlyCustomerCookies[i].hour + ': ' + objCookieData.hourlyCustomerCookies[i].cookieCount + ' cookies'; //Populate hourly cookie data in the new list item
    ulStore.append(liHourlyData);
  }

  liHourlyData = document.createElement('li');
  liHourlyData.textContent = 'Total: ' + objCookieData.totalCookies + ' cookies'; //Populate total cookie count at the end of the list
  ulStore.append(liHourlyData);
}


/* 1st and Pike Place Store */
var ulID = 'FirstAndPike';
var FirstAndPikeStore = {
  locationName: '1st and Pike',
  locationOpenHour: 6,
  locationCloseHour: 20,
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  avgCookiesPerCustomer: 6.3,
  hourlyCustomerCookies:[],
  calcCookies:function(){
    this.hourlyCustomerCookies = calcCookieCount(this.locationOpenHour, this.locationCloseHour, this.minHourlyCustomers, this.maxHourlyCustomers, this.avgCookiesPerCustomer);

    for (var i = 0; i < this.hourlyCustomerCookies.length; i++){
      this.totalCookies += this.hourlyCustomerCookies[i].cookieCount;
    }
  },
  totalCookies: 0
};

FirstAndPikeStore.calcCookies();
console.log('FirstAndPikeStore Average Cookies Per Customer =', FirstAndPikeStore.avgCookiesPerCustomer);
console.log('FirstAndPikeStore hourlyCustomerCookies Array =', FirstAndPikeStore.hourlyCustomerCookies);
console.log('FirstAndPikeStore Total Cookies =', FirstAndPikeStore.totalCookies);

// Populate data in sales.html
displaySalesProjections(ulID, FirstAndPikeStore);



/* SeaTac Airport */
ulID = 'SeaTacAirport';
var SeaTacAirport = {
  locationName: 'SeaTac Airport',
  locationOpenHour: 6,
  locationCloseHour: 20,
  minHourlyCustomers: 3,
  maxHourlyCustomers: 24,
  avgCookiesPerCustomer: 1.2,
  hourlyCustomerCookies:[],
  calcCookies:function(){
    this.hourlyCustomerCookies = calcCookieCount(this.locationOpenHour, this.locationCloseHour, this.minHourlyCustomers, this.maxHourlyCustomers, this.avgCookiesPerCustomer);

    for (var i = 0; i < this.hourlyCustomerCookies.length; i++){
      this.totalCookies += this.hourlyCustomerCookies[i].cookieCount;
    }
  },
  totalCookies: 0
};

SeaTacAirport.calcCookies();
console.log('SeaTacAirport Average Cookies Per Customer =', SeaTacAirport.avgCookiesPerCustomer);
console.log('SeaTacAirport hourlyCustomerCookies Array =', SeaTacAirport.hourlyCustomerCookies);

// Populate data in sales.html
displaySalesProjections(ulID, SeaTacAirport);

