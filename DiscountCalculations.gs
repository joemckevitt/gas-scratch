function isAuthorisedForTransaction(customer, amountOwed){

  if (customer != null && amountOwed < customer.balance) {
    Logger.log("Authorised");   
    return true;
  } else {
    Logger.log("NOT Authorised - Request customer to top-up"); 
    return false;
  }        
}

function applyDiscount(amountPurchased, pumpPrice, discountPrice){
  var pumpPriceDetails = findPumpPrice("Diesel");
  return amountPurchased * pumpPriceDetails.discountedPrice/pumpPriceDetails.pumpPrice;
}

/**
Contains all of the core discount calculations
*/

function calculateShortfall(amountOfFuelPuchased, discountedAmount, balance){
   
  Logger.log("Fuel amount without any discount (amountOfFuelPuchased) :" + amountOfFuelPuchased);  
  Logger.log("Fuel amount with discount (discountedAmount) :" + discountedAmount); 
  Logger.log("Balance (customer.balance) :" + balance);
          
  topupAmountRequired = discountedAmount - balance;

  return formatTopupAmount(topupAmountRequired);
         
}

//TODO no longer used, probably should remove.
function formatTopupAmount(topupAmountRequired) {

  Logger.log("Needs to topup :" + topupAmountRequired);
          
  var roundedTo2Decs = Math.round(topupAmountRequired * 100) / 100;
  shortfall = Number(Math.round(roundedTo2Decs+'e2')+'e-2').toFixed(2);
          
  Logger.log("Topup value, rounded by 2 decimal places (Shortfall) :" + shortfall);
          
  return shortfall;
}