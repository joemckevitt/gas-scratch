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

function formatTopupAmount(topupAmountRequired) {

          Logger.log("Needs to topup :" + topupAmountRequired);
          
          var roundedTo2Decs = Math.round(topupAmountRequired * 100) / 100;
          shortfall = Number(Math.round(roundedTo2Decs+'e2')+'e-2').toFixed(2);
          
          Logger.log("Topup value, rounded by 2 decimal places (Shortfall) :" + shortfall);
          
          return shortfall;
}