var isAuthorised;
var customerFound;
var shortfall;

function submitTranscaction(transaction){
  Logger.log("submitTranscation");

  var cust_num = transaction.number;
  var amountOfFuelPuchased = transaction.amount;
  var transactionCode = generateTransactionNumber();
  var fuelType = transaction.fuelType;
    
  appendRowOnTransactionSheet(cust_num, fuelType, amountOfFuelPuchased, transactionCode);
  
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
  
  var fields = ["customer number", customer.number,
                "customerFound", result.tableContainsCustomer,
                "name", (result.customer ? result.customer.name : "undefined"),
                "balance", (result.customer ? result.customer.balance : "undefined"),
                "isAuthorised", result.isAuthorised,];
  
  appendRowOnActivitySheet("findCustomer", fields);
  
  if (result.tableContainsCustomer){
        
    if (result.isAuthorised == false) {
       return {
          success: true, 
          customer: result.customer,
          isAuthorised: result.isAuthorised,
          //remove shortfall from the find customer method
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