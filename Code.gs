function doGet(){

 var HTMLString = "<style> h1,p {font-family: 'Helvitica', 'Arial'}</style>"
 + "<h1>Hello World!</h1>"
 + "<p>Welcome to the Web App";

 HTMLOutput = HtmlService.createHtmlOutput(HTMLString);
 return HTMLOutput
}