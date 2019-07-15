function submitTranscaction(transaction){
  Logger.log("submitTranscation");

  var cust_num = transaction.number;
  var amountOfFuelPuchased = transaction.amount;
  var transactionCode = generateTransactionNumber();
  var fuelType = transaction.fuelType;
    
  appendRowOnTransactionSheet(cust_num, fuelType, amountOfFuelPuchased, transactionCode);

  dispatchMailHtmlTemplate(transactionCode, generateTimestamp(), cust_num, fuelType, amountOfFuelPuchased);
  
  return {
    transactionNumber: transactionCode
  };
    
}

 function generateTransactionNumber(){
    var min=1; 
    var max=1000000;  
    return Math.floor(Math.random() * (+max - +min)) + +min; 
 }