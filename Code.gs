var masterSheet = 'Pre-Paid Readings';

var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); 
var CUSTOMERS_TABLE = spreadsheet.getSheetByName(masterSheet); 
var global_message;

function findCustomer(customer){
  Logger.log("find customer invoked " + customer.number);
  var data = CUSTOMERS_TABLE.getDataRange().getValues();
  
  if (prePaidLogic(data, customer)){
  
  Logger.log("customer found");
  
   return {
      success: true, 
      message: global_message,
      customer: customer
    }; 
  
  } else {
    Logger.log("customer not found");
    return {
     error: true, 
     message: global_message, 
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
  
  global_message = "No Customer found for that fuel card number";
  
  for( var i = 0; i < data.length; i++){
  
    if (data[i][0]){
      
      Logger.log("customer.number " + customer.number);      
      Logger.log("cell " + data[i][0]);
      
      if(data[i][0].toString() == customer.number.toString()){

        Logger.log("match found " + data[i][0]);   
        
        customer = {
          number: data[i][0], 
          name: data[i][1],
          balance: data[i][2],
        }
        
        if (discountedAmount < customer.balance) {
          global_message = "Authorised";
        } else {
          global_message = "NOT Authorised - Request customer to top-up"; 
        }
        
        tableContainsCustomer = true; 
      } 
    
    }
  
  }
    
  return tableContainsCustomer; 

}

function doGet(){

return HtmlService.createHtmlOutputFromFile('Index').setSandboxMode(HtmlService.SandboxMode.IFRAME)
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); 

}
