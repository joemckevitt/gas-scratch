var isAuthorised;
var customerFound;
var shortfall;

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
