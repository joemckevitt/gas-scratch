var masterSheet = 'Pre-Paid Readings';

var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); 
var CUSTOMERS_TABLE = spreadsheet.getSheetByName(masterSheet); 
var isAuthorised;
var customerFound;
var shortfall;

function findCustomer(customer){
  Logger.log("find customer invoked " + customer.number);
  var data = CUSTOMERS_TABLE.getDataRange().getValues();
  
  if (prePaidLogic(data, customer)){
  
    Logger.log("customer found");
    
    if (isAuthorised == false) {
       return {
          success: true, 
          customer: customer,
          isAuthorised: isAuthorised,
          shortfall: shortfall,
          customerFound: true
      };
    } else {
         return {
          success: true, 
          customer: customer,
          isAuthorised: isAuthorised,
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

function getTableData(table){

  return table.getDataRange().getValues();

}

function prePaidLogic(data, customer){

  var tableContainsCustomer = false; 
  
  var amountOfFuelPuchased = customer.amount;

  // apply discount rate - at 4%
  var discountedAmount = amountOfFuelPuchased * 0.96;
  
  for( var i = 0; i < data.length; i++){
  
    if (data[i][0]){
      
      if(data[i][0].toString() == customer.number.toString()){

        Logger.log("match found " + data[i][0]);   
        
        customer = {
          number: data[i][0], 
          name: data[i][1],
          balance: data[i][2],
        }
        
        if (discountedAmount < customer.balance) {
          Logger.log("Authorised");   
          isAuthorised = true;
        } else {
          Logger.log("NOT Authorised - Request customer to top-up"); 
          shortfall = calculateShortfall(amountOfFuelPuchased, discountedAmount, customer.balance);
          isAuthorised = false;
        }
        
        tableContainsCustomer = true;
        break;
      } 
    
    }
  
  }
    
  return tableContainsCustomer; 

}

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

function doGet(){

return HtmlService.createHtmlOutputFromFile('Index').setSandboxMode(HtmlService.SandboxMode.IFRAME)
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); 

}
