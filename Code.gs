var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); 
var CUSTOMERS_TABLE = spreadsheet.getSheets()[3]; 
var global_message;

function findCustomer(customer){
  Logger.log("find customer invoked " + customer.number);
  var data = CUSTOMERS_TABLE.getDataRange().getValues();
  
  if (tableContainsCustomer(data, customer)){
  
  Logger.log("customer found");
  
   return {
      success: true, 
      message: global_message,
      customer: customer
    }; 
  
  } else {
    Logger.log("custoemr not found");
    return {
     error: true, 
     message: global_message,
     //message: "Customer with fuel card number " + customer.number + " NOT found", 
    };
  }

}

function getTableData(table){

  return table.getDataRange().getValues();

}

function tableContainsCustomer(data, customer){

  var tableContainsCustomer = false; 
  
  var input_amount = customer.amount;
  
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
        
        if (input_amount < customer.balance) {
          global_message = "Authorised";
        } else {
          global_message = "NOT Authorised - Request customer to top-up"; 
        }
        
        //global_message = "Customer with fuel card number: " + customer.number + ", Customer: " + customer.name + " with balance of £" + customer.balance; 
        
        tableContainsCustomer = true; 
      } 
    
    }
  
  }
    
  return tableContainsCustomer; 

}

function getCustomers(){

  var data = getTableData(CUSTOMERS_TABLE); 
  var customers = [];   
  for (var i = 0; i < data.length; i++){
    
    var customer = {
      name: data[i][1],
    }
    
    customers.push(customer); 
  }
  
  return {
      success: true, 
      message: "Customers have been rendered.", 
      customers: customers, 
    }; 
}

function doGet(){

return HtmlService.createHtmlOutputFromFile('Index').setSandboxMode(HtmlService.SandboxMode.IFRAME)
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); 

}
