var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); 

var USERS_TABLE = spreadsheet.getSheets()[0]; 
var IDEAS_TABLE = spreadsheet.getSheets()[1]; 
var VOTES_TABLE = spreadsheet.getSheets()[2]; 
var CUSTOMERS_TABLE = spreadsheet.getSheets()[3]; 
var global_message;

function registerUser(user){

  var data = getTableData(USERS_TABLE);
  
  if (!tableContainsUser(data, user)){
  
    USERS_TABLE.appendRow([user.email, user.name]); 
  
    return {
      success: true, 
      message: "User with the email " + user.email + " was added successfully", 
      authUser: user
    }; 
  
  } else {
  
    return {
     error: true, 
     message: "User with the email " + user.email + " is already registered"
    };
  }
}

function findCustomer(customer){
  Logger.log("find customer invoked " + customer.number);
  var data = CUSTOMERS_TABLE.getDataRange().getValues();
  
  if (tableContainsCustomer(data, customer)){
  
  Logger.log("custoemr found");
  
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

function loginUser(user){
var data = USERS_TABLE.getDataRange().getValues();
  
  if (tableContainsUser(data, user)){
   return {
      success: true, 
      message: "User with the email " + user.email + " is already registered", 
      authUser: user
    }; 
  
  } else {
  
    return {
     error: true, 
     message: "User with the email " + user.email + " has not registered"
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

function tableContainsUser(data, user){

  var tableContainsUser = false; 
  
  for( var i = 0; i < data.length; i++){
  
    if (data[i][0]){
      
      if(data[i][0].toLowerCase() == user.email.toLowerCase()){
        
        tableContainsUser = true; 
      } 
    
    }
  
  }
    
  return tableContainsUser; 

}

function addIdea(user, idea){
  var data = getTableData(IDEAS_TABLE); 
  if(!tableContainsUser(data, user)){
  
    IDEAS_TABLE.appendRow([user.email, idea.name, idea.description, idea.image]); 
    
    return {
      success: true, 
      message: "Idea with the name '"+ idea.name + "' has been submitted by " + user.email + "." , 
      authUser: user
    };
  
  } else {
  
    return {
     error: true, 
     message: "User with the email " + user.email + " has already submitted an idea."
    };
  
  }
}

function getIdeas(){

  var data = getTableData(IDEAS_TABLE); 
  var ideas = []; 
  
  for (var i = 0; i < data.length; i++){
    
    var idea = {
      email: data[i][0], 
      name: data[i][1],
      description: data[i][2],
      image: data[i][3], 
    }
    
    idea.voteCount = countVotes(idea); 
    ideas.push(idea); 
  }
  
  return {
      success: true, 
      message: "Ideas have been rendered.", 
      ideas: ideas, 
    }; 
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

function countVotes(idea){ 
 var voteCount = 0;  
 var data = getTableData(VOTES_TABLE); 
  for (var i = 0; i < data.length; i++){
    if (data[i][1] == idea.email){
      voteCount++; 
    }
  }
  
  return voteCount; 
  
}

function addVote(user, idea){
  
  var data = getTableData(VOTES_TABLE); 
  
  if(!tableContainsUser(data, user)){
    VOTES_TABLE.appendRow([user.email, idea.email]); 
    return {
      success: true, 
      message: "You cast your vote for'"+ idea.name + ".'", 
      authUser: user
    };
  
  } else {
  
    return {
     error: true, 
     message: "User with the email " + user.email + " has already voted for an idea."
    };
  
  }

}

function doGet(){

return HtmlService.createHtmlOutputFromFile('Index').setSandboxMode(HtmlService.SandboxMode.IFRAME)
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); 

}
