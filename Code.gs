var isAuthorised;
var customerFound;
var shortfall;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}



function submitTranscation(transaction){
  Logger.log("submitTranscation");
  var cust_num = transaction.number;
  var amountOfFuelPuchased = transaction.amount;
  var transactionCode = generateTransactionNumber();
  var fuelType = transaction.fuelType;

  Logger.log("customer number " + cust_num);
  Logger.log("amount " + amountOfFuelPuchased);
  Logger.log("transactionCode " + transactionCode);
  Logger.log("fuelType " + fuelType);
  
  var doc = SpreadsheetApp.getActive();
  var sheet = doc.getSheetByName("Transactions");
  var range;

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  
  Logger.log("dateTime " + dateTime);
  
  sheet.appendRow([dateTime, cust_num, fuelType, amountOfFuelPuchased, transactionCode]);
  
  return {
    transactionNumber: transactionCode
  };
    
}

 function generateTransactionNumber(){
    var min=1; 
    var max=1000000;  
    return Math.floor(Math.random() * (+max - +min)) + +min; 
 }
 
 function findCustomer(customer){

  return findCustomerV2(data, customer);
 }

 
function findCustomerV2(data, customer){
  Logger.log("find customer invoked " + customer.number);
  
  var result = prePaidLogic(data, customer);
  
    Logger.log("results from prePaidLogic " 
    + " result.tableContainsCustomer=" + result.tableContainsCustomer
    + ", result.isAuthorised=" + result.isAuthorised
    + ", result.discountedAmount=" + result.discountedAmount);
  
  if (result.tableContainsCustomer){
    
      Logger.log("customer found " 
    + ", customer.number=" + result.customer.number 
    + ", customer.name=" + result.customer.name
    + ", customer.balance=" + result.customer.balance);
    
    if (result.isAuthorised == false) {
       return {
          success: true, 
          customer: result.customer,
          isAuthorised: result.isAuthorised,
          shortfall: shortfall,
          customerFound: true
      };
    } else {
         return {
          success: true, 
          customer: result.customer,
          isAuthorised: result.isAuthorised,
          customerFound: true
      };
    }
  
  } else {
    Logger.log("customer not found");
    return {
     error: true, 
     isAuthorised: false,
     customerFound: false
    };
  }

}

function prePaidLogic(data, customer){
  
  //TODO make a local variable and remove global
  isAuthorised = false;
  var discountedAmount = 0;
  
  var amountOfFuelPuchased = customer.amount;
  
  var customerFound = lookupCustomer(data, customer.number);
  
  if (customerFound != null){
        discountedAmount = applyDiscount(amountOfFuelPuchased, 100, 96)
        //TODO calculate shortfall...
  }    
  
  return {
     tableContainsCustomer: customerFound != null, 
     isAuthorised: isAuthorisedForTransaction(customerFound, discountedAmount),
     discountedAmount: discountedAmount,
     customer: customerFound
   };

}