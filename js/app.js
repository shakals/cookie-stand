
//This function accepts a time range (Opening and Closing time of store in hours) and minimum and maximum limit for number of customers during any hour for that store.
//Then, it generates random number of customers for each hour.
function generateRandomCustomerCount (locationOpenHour, locationCloseHour, minCustomers, maxCustomers) {
  //Create an array to store the hour (first element) and respective customer count each hour (second element). This will later become an array of arrays in subsequent steps.
  var customersPerHour = [];
  var arrIndex = 0;

  //Loop through the hours to generate random number of customers for each hour
  for (var i = locationOpenHour; i <= locationCloseHour; i++){
    // 'customersPerHour' becomes an array of arrays in the next step (emulating a 2D array to store hour and customer count values for every hour from opening time till closing time of store)
    // The Math function will generate random numbers inclusive of both boundaries.
    customersPerHour[arrIndex] = [i, Math.floor(Math.random() * (maxCustomers - minCustomers + 1)) + minCustomers];
    console.log('customersPerHour[' + arrIndex + ']' + '[0] =' + customersPerHour[arrIndex][0] + ' -- [' + arrIndex + ']' + '[1] =' + customersPerHour[arrIndex][1]);
    arrIndex++;
  }
  return customersPerHour;
}


//This function accepts 2 inputs: Average count of cookies for the store and an array of arrays containing customer count per hour for each hour between Store open and close time.
//Then, it generates random number of customers for each hour.
function calculateCookieCount (avgCookiesPerCustomer, customerArray) {
  //Create an array to store the hour (first element) and calculated cookie count each hour (second element). This will later become an array of arrays in subsequent steps.
  var cookiesPerHour = [];

  //Loop through the customer count Array to calculate cookie count each hour and store the results in cookiesPerHour array (another array of arrays)
  for (var i = 0; i < customerArray.length; i++){    
    cookiesPerHour[i] = [customerArray[i][0], (customerArray[i][1] * avgCookiesPerCustomer)];
    console.log('cookiesPerHour[' + i + ']' + '[0] =' + cookiesPerHour[i][0] + ' -- [' + i + ']' + '[1] =' + cookiesPerHour[i][1]);    
  }
  return cookiesPerHour;
}

/*function displaySalesProjections(ulID){
  var ulStore = document.getElementById(ulID);

 // for (var i = 0; i < )
}*/

//1st and Pike Place Store
var FirstAndPikeStore = {
  locationName: '1st and Pike',
  locationOpenHour: 6,
  locationCloseHour: 20,
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  avgCookiesPerCustomer: 6.3,
  customersPerHour: [],
  cookiesPerHour: [],
  totalCookies: 0
};

FirstAndPikeStore.customersPerHour = generateRandomCustomerCount(FirstAndPikeStore.locationOpenHour, FirstAndPikeStore.locationCloseHour, FirstAndPikeStore.minHourlyCustomers, FirstAndPikeStore.maxHourlyCustomers);
console.log('FirstAndPikeStore customersPerHour array element 13,1 =', FirstAndPikeStore.customersPerHour[13][1]);

FirstAndPikeStore.cookiesPerHour = calculateCookieCount(FirstAndPikeStore.avgCookiesPerCustomer, FirstAndPikeStore.customersPerHour);
console.log('FirstAndPikeStore cookiesPerHour array element 5,1 =', FirstAndPikeStore.cookiesPerHour[5][1]);
