function isCustomerAuthorised(customer) {
  return isCustomerAuthorisedWrapper(data, customer);
}

function isCustomerAuthorisedWrapper(data, customer){
  Logger.log("find customer invoked " + customer.number);
  
  var result = prePaidLogicForIsAuthorised(data, customer);
  
  //TODO add fuel type and price per litre
  var fields = ["customer number", customer.number,
                "name", (result.customer ? result.customer.name : "undefined"),
                "balance", (result.customer ? result.customer.balance : "undefined"),
                "fuel type", customer.fuelType,
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

function prePaidLogicForIsAuthorised(data, customer){
  
  //TODO make a local variable and remove global
  isAuthorised = false;
  var discountedAmount = 0;
  
  var amountOfFuelPuchased = customer.amount;
  
  var customerFound = lookupCustomer(data, customer.number);
  
  if (customerFound != null){
        var pumpPriceDetails = findPumpPrice();
        discountedAmount = applyDiscount(amountOfFuelPuchased, customer.fuelType, pumpPriceDetails)
        //TODO calculate shortfall...
  }    
  
  return {
     isAuthorised: isAuthorisedForTransaction(customerFound, discountedAmount),
     //TODO should we remove this?
     discountedAmount: discountedAmount,
     //TODO should we remove this?
     customer: customerFound
   };

}
