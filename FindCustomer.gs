function findCustomer(customer){
  return findCustomerWrapper(data, customer);
}

function findCustomerWrapper(data, customer){
  Logger.log("find customer invoked " + customer.number);
  
  var result = prePaidLogic(data, customer);
  
  var fields = ["customer number", customer.number,
                "customerFound", result.tableContainsCustomer,
                "name", (result.customer ? result.customer.name : "undefined"),
                "balance", (result.customer ? result.customer.balance : "undefined"),
                "isAuthorised", result.isAuthorised];
  
  appendRowOnActivitySheet("findCustomer", fields);
  
  if (result.tableContainsCustomer){
     return {
          success: true, 
          customer: result.customer,
          //isAuthorised: result.isAuthorised,
          customerFound: true
      };  
  } else {
    Logger.log("customer not found");
    return {
     error: true, 
     customerFound: false
    };
  }

}