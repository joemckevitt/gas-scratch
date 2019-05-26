var isAuthorised;
var customerFound;
var shortfall;

function submitTranscation(transaction){
  Logger.log("submitTranscation");
  var cust_num = transaction.number;
  var amountOfFuelPuchased = transaction.amount;
  var transactionCode = generateTransactionNumber();
  var fuelType = transaction.fuelType;

  Logger.log("customer number " + cust_num);
  Logger.log("amount " + amountOfFuelPuchased);
  Logger.log("transactionCode " + transactionCode);
  Logger.log("fuelType " + fuelType);
  
  var doc = SpreadsheetApp.getActive();
  var sheet = doc.getSheetByName("Transactions");
  var range;

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  
  Logger.log("dateTime " + dateTime);
  
  sheet.appendRow([dateTime, cust_num, fuelType, amountOfFuelPuchased, transactionCode]);
  
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
  Logger.log("find customer invoked " + customer.number);
  
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


function prePaidLogic(data, customer){

  var tableContainsCustomer = false; 
  
  var amountOfFuelPuchased = customer.amount;

  //TODO move to the Discount Calculation class
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
