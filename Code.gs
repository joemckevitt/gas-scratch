var isAuthorised;
var customerFound;
var shortfall;

//TODO remove this method and update hte dependencies that call it
function prePaidLogic(data, customer){
  
  //TODO make a local variable and remove global
  isAuthorised = false;
  var discountedAmount = 0;
  
  var amountOfFuelPuchased = customer.amount;
  
  var customerFound = lookupCustomer(data, customer.number);
  
  if (customerFound != null){
        var pumpPriceDetails = findPumpPrice();
        discountedAmount = applyDiscount(amountOfFuelPuchased, "Diesel", pumpPriceDetails)
        //TODO calculate shortfall...
  }    
  
  return {
     tableContainsCustomer: customerFound != null, 
     isAuthorised: isAuthorisedForTransaction(customerFound, discountedAmount),
     discountedAmount: discountedAmount,
     customer: customerFound
   };

}