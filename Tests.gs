//QUnit.helpers( this );

//function doGet( e ) {
//  QUnit.urlParams( e.parameter );
//  QUnit.config({
//    title: "QUnit for Google Apps Script - Test suite" // Sets the title of the test page.
//  });
//  QUnit.load( tests );
//  return QUnit.getHtml();
//};

function tests() {
  console = Logger;
  testIsAuthorised1();
  testIsAuthorised2();
  testApplyDiscount1();
  prePaidLogicCustomerFoundIsAuthorisedAndDiscountAmountCorrect();
  prePaidLogicCustomerNotFoundNotAuthorisedAndDiscountAmountZero();
  tempTestMultipleCustomers();
  prePaidLogicCustomerFoundNotAuthorisedAndDiscountAmountCorrect();
  testFindCustomerCustomerFound();
  testFindCustomerNotFound();
  testFindCustomerNotFoundReturnsError();
  testFindCustomerIsAuthorised();
  testFindCustomerNotAuthorised();
  testFindCustomerReturnsCorrectCustomer();
  testFindCustomerNotAuthorisedReturnsCorrectCustomer();
}

function prePaidLogicCustomerFoundIsAuthorisedAndDiscountAmountCorrect(){
  
  test("temp test happy path", function () {  
  
  var data = new Array(1)
  data[0]=new Array(1);
  data[0][0] = 1
  data[0][1] = "Joe"
  data[0][2] = 500

  var customer = {
    number: 1, 
    amount: 100
  }
  
  var result = prePaidLogic(data, customer);
  
  equal(result.tableContainsCustomer, true);
  equal(result.isAuthorised, true);
  equal(result.discountedAmount, 96);
  
  });
}

function prePaidLogicCustomerNotFoundNotAuthorisedAndDiscountAmountZero(){
  
  test("temp test happy path", function () {  
  
  var data = new Array(1)
  data[0]=new Array(1);
  data[0][0] = 1
  data[0][1] = "Joe"
  data[0][2] = 50

  var customer = {
    number: 2,
    amount: 100
  }
  
  var result = prePaidLogic(data, customer);
  
  equal(result.tableContainsCustomer, false);
  //TODO fix this should default to false
  equal(result.isAuthorised, false);
  equal(result.discountedAmount, 0);
  });
}

function tempTestMultipleCustomers(){
  
  test("temp test happy path", function () {  
  
  var data = new Array(2)
  data[0]=new Array(1);
  data[0][0] = 1
  data[0][1] = "Joe"
  data[0][2] = 50
  
  data[1]=new Array(1);
  data[1][0] = 2
  data[1][1] = "Gordon"
  data[1][2] = 500

  var customer = {
    number: 2,
    amount: 100
  }
  
  var result = prePaidLogic(data, customer);
  
  equal(result.tableContainsCustomer, true);
  equal(result.isAuthorised, true);
  equal(result.discountedAmount, 96);
  
  });
}

function prePaidLogicCustomerFoundNotAuthorisedAndDiscountAmountCorrect(){
  
  test("temp test happy path", function () {  
  
  var data = new Array(1)
  data[0]=new Array(1);
  data[0][0] = 1
  data[0][1] = "Joe"
  data[0][2] = 0

  var customer = {
    number: 1, 
    amount: 100
  }
  
  var result = prePaidLogic(data, customer);
  
  equal(result.tableContainsCustomer, true);
  equal(result.isAuthorised, false);
  equal(result.discountedAmount, 96);
  
  });
}

function testIsAuthorised1(){
  
  test("isAuthorised should return true when balance is greater than the amount owed", function () {
  
  var customer = {
    number: 1, 
    name: "Joe",
    balance: 50,
  }
    
  equal(isAuthorisedForTransaction(customer, 10), true);
  
  });
}

function testIsAuthorised2(){
  
  test("isAuthorised should return false when balance is less than the amount owed", function () {
  
  var customer = {
    number: 1, 
    name: "Joe",
    balance: 50,
  }
    
  equal(isAuthorisedForTransaction(customer, 100), false);
  
  });
}

function testApplyDiscount1(){

  var amountPurchased = 100;
  var pumpFuelPrice = 1;
  var discountedFuelPrice = 0.5
  var expectedResult = 50

  test("applyDiscount should return ["+expectedResult+"] when the petrol price is ["+pumpFuelPrice+"] " + 
    "and the discounted price is ["+discountedFuelPrice+"] " + 
    "and the amount purchased is ["+amountPurchased+"]", function () {

  equal(applyDiscount(amountPurchased, pumpFuelPrice, discountedFuelPrice), expectedResult);
  
  });
}

function testFindCustomerCustomerFound(){
  
  test("test find customer returns true if a customer is found", function () {  
  
    var data = new Array(1)
    data[0]=new Array(1);
    data[0][0] = 1
    data[0][1] = "Joe"
    data[0][2] = 200
    
    var customer = {
      number: 1, 
      amount: 100
    }
    
    var result = findCustomerV2(data, customer);
    
    equal(result.success, true);
    equal(result.customerFound, true);
  });
}

//TODO remove the success flag (not sure it means sense)
function testFindCustomerNotFound(){
  
  test("test find customer returns false if a customer is not found", function () {  
  
    var data = new Array(1)
    data[0]=new Array(1);
    data[0][0] = 2
    data[0][1] = "Joe"
    data[0][2] = 200
    
    var customer = {
      number: 1, 
      amount: 100
    }
    
    var result = findCustomerV2(data, customer);
    
    equal(result.customerFound, false);
  });
}

//TODO remove the success flag (not sure it means sense)
function testFindCustomerNotFoundReturnsError(){
  
  test("test find customer returns false if a customer is not found", function () {  
  
    var data = new Array(1)
    data[0]=new Array(1);
    data[0][0] = 2
    data[0][1] = "Joe"
    data[0][2] = 200
    
    var customer = {
      number: 1, 
      amount: 100
    }
    
    var result = findCustomerV2(data, customer);
    
    equal(result.customerFound, false);
    equal(result.error, true);
    equal(result.isAuthorised, false);
  });
}

function testFindCustomerIsAuthorised(){
  
  test("test find customer, is Authorised", function () {  
  
    var data = new Array(1)
    data[0]=new Array(1);
    data[0][0] = 1
    data[0][1] = "Joe"
    data[0][2] = 200
    
    var customer = {
      number: 1, 
      amount: 100
    }
    
    var result = findCustomerV2(data, customer);
    
    equal(result.success, true);
    equal(result.isAuthorised, true);
  
  });
}

function testFindCustomerNotAuthorised(){
  
  test("test find customer, not Authorised", function () {  
  
    var data = new Array(1)
    data[0]=new Array(1);
    data[0][0] = 1
    data[0][1] = "Joe"
    data[0][2] = 0
  
    var customer = {
      number: 1, 
      amount: 100
    }
    
    var result = findCustomerV2(data, customer);
    
    equal(result.success, true);
    equal(result.isAuthorised, false);
  
  });
}

function testFindCustomerReturnsCorrectCustomer(){
  
  test("test find customer, returns correct customer", function () {  
  
    var data = new Array(1)
    data[0]=new Array(1);
    data[0][0] = 1
    data[0][1] = "Joe"
    data[0][2] = 500
  
    var customer = {
      number: 1, 
      amount: 100
    }
    
    var result = findCustomerV2(data, customer);
    
    var actualCustomer = result.customer;
    
    var expectedCustomer = {
      number: 1, 
      name: "Joe",
      balance: 500
    }
    
    equal(actualCustomer.number, expectedCustomer.number);
    equal(actualCustomer.name, expectedCustomer.name);
    equal(actualCustomer.balance, expectedCustomer.balance);

  });
}

function testFindCustomerNotAuthorisedReturnsCorrectCustomer(){
  
  test("test find customer, returns correct customer for customers who are not authorised", function () {  
  
    var data = new Array(1)
    data[0]=new Array(1);
    data[0][0] = 1
    data[0][1] = "Joe"
    data[0][2] = 0
  
    var customer = {
      number: 1, 
      amount: 100
    }
    
    var result = findCustomerV2(data, customer);
    
    var actualCustomer = result.customer;
    
    var expectedCustomer = {
      number: 1, 
      name: "Joe",
      balance: 0
    }
    
    equal(result.isAuthorised, false);   
    equal(actualCustomer.number, expectedCustomer.number);
    equal(actualCustomer.name, expectedCustomer.name);
    equal(actualCustomer.balance, expectedCustomer.balance);

  });
}

//write unit tests for transation results