/**
Contains all of the specific logic to the google sheet
*/
var masterSheet = 'Pre-Paid Readings';
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); 
var CUSTOMERS_TABLE = spreadsheet.getSheetByName(masterSheet); 
var data = CUSTOMERS_TABLE.getDataRange().getValues();

function lookupCustomer(data, customerNumber){

  for( var i = 0; i < data.length; i++){
  
    if (data[i][0]){
      
      if(data[i][0].toString() == customerNumber.toString()){

        Logger.log("entry found for customer no:" + data[i][0]);   
        
        customer = {
          number: data[i][0], 
          name: data[i][1],
          balance: data[i][2],
        };
        
        Logger.log({customer: customer});
        
        return customer; 
              
      } 
    
    }
  }
  
  return; 

}

