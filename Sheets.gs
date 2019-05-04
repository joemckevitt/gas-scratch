/**
Contains all of the specific logic to the google sheet
*/
var masterSheet = 'Pre-Paid Readings';
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); 
var CUSTOMERS_TABLE = spreadsheet.getSheetByName(masterSheet); 
var data = CUSTOMERS_TABLE.getDataRange().getValues();

