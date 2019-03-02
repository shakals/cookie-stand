
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


//1st and Pike Place Store
var FirstAndPikeStore = {
  locationName: '1st and Pike',
  locationOpenHour: 6,
  locationCloseHour: 20,
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  avgCookiesPerCustomer: 6.3,
  customersPerHour: [],
  getCustomersPerHour: function(){
    this.customersPerHour = generateRandomCustomerCount(this.locationOpenHour, this.locationCloseHour, this.minHourlyCustomers, this.maxHourlyCustomers);
  }
};

//console.log('result=', FirstAndPikeStore.getCustomersPerHour());
//console.log('result=', generateRandomCustomerCount(FirstAndPikeStore.locationOpenHour, FirstAndPikeStore.locationCloseHour, FirstAndPikeStore.minHourlyCustomers, FirstAndPikeStore.maxHourlyCustomers));
FirstAndPikeStore.getCustomersPerHour();
console.log('FirstAndPikeStore object prop =', FirstAndPikeStore.customersPerHour[13][1]);

