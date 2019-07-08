var isAuthorised;
var customerFound;
var shortfall;

 
 function findCustomer(customer){
  return findCustomerWrapper(data, customer);
 }
 
 
 function isCustomerAuthorised(customer){
  return isCustomerAuthorisedWrapper(data, customer);
 }

function findCustomerWrapper(data, customer){
  Logger.log("find customer invoked " + customer.number);
  
  var result = prePaidLogic(data, customer);
  
  var fields = ["customer number", customer.number,
                "customerFound", result.tableContainsCustomer,
                "name", (result.customer ? result.customer.name : "undefined"),
                "balance", (result.customer ? result.customer.balance : "undefined"),
                "isAuthorised", result.isAuthorised,];
  
  appendRowOnActivitySheet("findCustomer", fields);
  
  if (result.tableContainsCustomer){
     return {
          success: true, 
          customer: result.customer,
          //isAuthorised: result.isAuthorised,
          customerFound: true
      };  
  } else {
    Logger.log("customer not found");
    return {
     error: true, 
     customerFound: false
    };
  }

}

function isCustomerAuthorisedWrapper(data, customer){
  Logger.log("find customer invoked " + customer.number);
  
  var result = prePaidLogicForIsAuthorised(data, customer);
  
  var fields = ["customer number", customer.number,
                "name", (result.customer ? result.customer.name : "undefined"),
                "balance", (result.customer ? result.customer.balance : "undefined"),
                "isAuthorised", result.isAuthorised,];
  
  appendRowOnActivitySheet("isAuthorised", fields);
  
    if (result.isAuthorised == false) {
       return {
          success: true, 
          customer: result.customer,
          isAuthorised: result.isAuthorised,
          //remove shortfall from the find customer method
          shortfall: shortfall,
      };
    } else {
         return {
          success: true, 
          customer: result.customer,
          isAuthorised: result.isAuthorised,
      };
   }
  
}

//TODO remove this method and update hte dependencies that call it
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

function prePaidLogicForIsAuthorised(data, customer){
  
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
     //tableContainsCustomer: customerFound != null, 
     isAuthorised: isAuthorisedForTransaction(customerFound, discountedAmount),
     discountedAmount: discountedAmount,
     customer: customerFound
   };

}

function submitTranscaction(transaction){
  Logger.log("submitTranscation");

  var cust_num = transaction.number;
  var amountOfFuelPuchased = transaction.amount;
  var transactionCode = generateTransactionNumber();
  var fuelType = transaction.fuelType;
    
  appendRowOnTransactionSheet(cust_num, fuelType, amountOfFuelPuchased, transactionCode);

  dispatchMailHtmlTemplate(transactionCode, generateTimestamp(), cust_num, fuelType, amountOfFuelPuchased);
  
  return {
    transactionNumber: transactionCode
  };
    
}

 function generateTransactionNumber(){
    var min=1; 
    var max=1000000;  
    return Math.floor(Math.random() * (+max - +min)) + +min; 
 }