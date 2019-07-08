/*
  Important - do not run these unit tests in production
  When we run each test, there is a side effect that appends the row to the activity sheet
  The cleanUpTestSideEfectsOnActivity() cleans the activity sheet after each test 
*/

//QUnit.helpers( this );
//function doGet( e ) {
//  QUnit.urlParams( e.parameter );
//  QUnit.config({
//    title: "Test suite for Fueller" 
//  });
//  QUnit.testDone(cleanUpTestSideEfectsOnActivity);
//  QUnit.load( tests );
//  return QUnit.getHtml();
//};


function tests() {
  console = Logger;
  testIsAuthorised1();
  testIsAuthorised2();
  testApplyDiscount();
  
  //high level tests (more like component tests)
  testFindCustomerCustomerFound();
  testFindCustomerNotFound();
  testFindCustomerNotFoundReturnsError();
  testFindCustomerIsAuthorised();
  testFindCustomerNotAuthorised();
  testFindCustomerReturnsCorrectCustomer();
  tempTestMultipleCustomers();
  testCustomerExistsButNotAuthorised();
  testSubmitTranscaction();
  
  //** related to asserting discounted prices
  //**********************************************************************************
  //unit tests for looking up pump prices
  testLookupPumpRateForDiesel();
  testLookupPumpRateForPetrol();
  testLookupPumpRateForInvalidPumpType();
  
  //TODO review whether these tests are still required (or covered with other tests)
  prePaidLogicCustomerFoundIsAuthorisedAndDiscountAmountCorrect();
  prePaidLogicCustomerNotFoundNotAuthorisedAndDiscountAmountZero();
  prePaidLogicCustomerFoundNotAuthorisedAndDiscountAmountCorrect();
  //**********************************************************************************  
  
}

function prePaidLogicCustomerFoundIsAuthorisedAndDiscountAmountCorrect(){
  
  test("return correct discounted amount for authorised customer", function () {  
  
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
  equal(result.discountedAmount, 95);
  
  });
}

function prePaidLogicCustomerNotFoundNotAuthorisedAndDiscountAmountZero(){
  
  test("return discounted amount of zero for customer not found", function () {  
  
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

function prePaidLogicCustomerFoundNotAuthorisedAndDiscountAmountCorrect(){
  
  test("return correct discount for custoemr found but not authorised", function () {  
  
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
  equal(result.discountedAmount, 95);
  
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

function testApplyDiscount(){

  var amountPurchased = 100;
  var pumpFuelPrice = 1;
  var discountedFuelPrice = 0.5
  var expectedResult = 95

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
    
    var result = findCustomerWrapper(data, customer);
    
    equal(result.success, true);
    equal(result.customerFound, true);
  });
}

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
    
    var result = findCustomerWrapper(data, customer);
    
    equal(result.customerFound, false);
  });
}

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
    
    var result = findCustomerWrapper(data, customer);
    
    equal(result.customerFound, false);
    equal(result.error, true);
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
    
    var result = isCustomerAuthorisedWrapper(data, customer);
    
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
    
    var result = isCustomerAuthorisedWrapper(data, customer);
    
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
    
    var result = findCustomerWrapper(data, customer);
    
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

//TODO this test is a design problem, testing two things
function testCustomerExistsButNotAuthorised(){
  
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
    
    var result = isCustomerAuthorisedWrapper(data, customer);
    
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

function tempTestMultipleCustomers(){
  
  test("returns correct customer given multiple customers", function () {  
  
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
  
  var expectedCustomer = {
      number: 2, 
      name: "Gordon",
      balance: 500
  }
  
  var result = isCustomerAuthorisedWrapper(data, customer);

  var actualCustomer = result.customer;
  
  equal(actualCustomer.number, expectedCustomer.number);
  equal(actualCustomer.name, expectedCustomer.name);
  equal(actualCustomer.balance, expectedCustomer.balance);
  
  
  });
}

function testSubmitTranscaction(){
  
  test("test happy path for submit transaction", function () {  
  
    var transaction = {
        number: 123456, 
        amount: 100,
        fuelType: 'Diesel'
    }
    
    var transactionCode = submitTranscaction(transaction);
    
    notEqual( transactionCode, undefined, "transactions code not undefined" );
    notEqual( transactionCode, null, "transactions code is not null" );


    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); 
    var sheet = spreadsheet.getSheetByName("Transactions"); 
    // This logs the value in the very last cell of this sheet
    var lastRow = sheet.getLastRow();
    
    //test the expected entry was added to the sheet
    var actualCustomerNumber = sheet.getRange(lastRow, 2).getValue();
    equal(actualCustomerNumber, 123456);
    
    var actualAmount = sheet.getRange(lastRow, 4).getValue();
    equal(actualAmount, 100);
    
    //**** test side effect clean up code ******
    //remove the row when the test ends
    sheet.deleteRow(lastRow);

  });
}

function testLookupPumpRateForDiesel(){
  
  test("test looking up the pump price for Diesel", function () {  
    
    var result = findPumpPrice("Diesel");
    
    equal(result.success, true);
    equal(result.fuelType, "Diesel");
    equal(result.pumpPrice, 100);
    equal(result.discountedPrice, 95);
  });
}

function testLookupPumpRateForPetrol(){
  
  test("test looking up the pump price for Petrol", function () {  
  
    var result = findPumpPrice("Petrol");
    
    equal(result.success, true);
    equal(result.fuelType, "Petrol");
    equal(result.pumpPrice, 100);
    equal(result.discountedPrice, 80);
  });
}

function testLookupPumpRateForInvalidPumpType(){
  
  test("test looking up the pump price for Invalid pump type", function () {  
  
    var result = findPumpPrice("invalid");
    
    equal(result.success, false);
  });
}

//may use to ensure we always have a clean state...
function cleanUpTestSideEfectsOnActivity(){
  console.log('***** . test done invoked *********');
  var doc = SpreadsheetApp.getActive();
  var sheet = doc.getSheetByName("Activity");
  var lastRow = sheet.getLastRow();
  //TODO add more inteligence to the remove method to ensure its only removing test fixtures
  if (lastRow){
    sheet.deleteRow(lastRow);
  }
  
}

//what tests if any, do i need to write for appendRowOnTransactionSheet?
//write a test for when the sheet does not exist
//verify shortfall
//remove shortfall from the find customer method
//TODO fix the text 'temp happy path'