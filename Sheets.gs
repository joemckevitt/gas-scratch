/**
Contains all of the specific logic to the google sheet
*/
var readingsSheet = 'Pre-Paid Readings';
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); 
var CUSTOMERS_TABLE = spreadsheet.getSheetByName(readingsSheet); 
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

function appendRowOnTransactionSheet(cust_num, fuelType, amountOfFuelPuchased, transactionCode){
  var doc = SpreadsheetApp.getActive();
  var sheet = doc.getSheetByName("Transactions");
  var dateTime = generateTimestamp();
  
  Logger.log("dateTime " + dateTime);
  Logger.log("customer number " + cust_num);
  Logger.log("fuelType " + fuelType); 
  Logger.log("amount " + amountOfFuelPuchased);
  Logger.log("transactionCode " + transactionCode);

  sheet.appendRow([dateTime, cust_num, fuelType, amountOfFuelPuchased, transactionCode]);
}

function appendRowOnActivitySheet(activityName, fields){
  var doc = SpreadsheetApp.getActive();
  var sheet = doc.getSheetByName("Activity");
  var dateTime = generateTimestamp();
  
  //append timestamp and activity to the beginnning of the row
  fields.unshift(activityName);
  fields.unshift(dateTime);
  Logger.log("********** appendRowOnActivitySheet *****************");
  Logger.log(fields);
  Logger.log("********** appendRowOnActivitySheet *****************");
  sheet.appendRow(fields);
}

function generateTimestamp(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  return dateTime;
}

