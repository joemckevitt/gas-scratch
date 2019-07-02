//function invokeEmail() {
//  dispatchMailHtmlTemplate(123, '2019-6-29 09:21:55', 12, 'Diesel', 1000);
//}


function dispatchMailHtmlTemplate(transactionNo, timestamp, customerNo, fuelType, pumpPrice) {
  var message =  '   <table>  '  + 
 '   <tbody>  '  + 
 '   <tr>  '  + 
 '   <td><strong>Transaction</strong></td>  '  + 
 '   <td> ' + transactionNo +'</td>  '  + 
 '   </tr>  '  + 
 '   <tr>  '  + 
 '   <td><strong>Timestamp</strong></td>  '  + 
 '   <td> ' + timestamp +'</td>  '  + 
 '   </tr>  '  + 
 '   <tr>  '  + 
 '   <td><strong>Customer Number</strong></td>  '  + 
 '   <td> ' + customerNo +'</td>  '  + 
 '   </tr>  '  + 
 '   <tr>  '  + 
 '   <td>  '  + 
 '   <div><strong>Fuel Type</strong></div>  '  + 
 '   </td>  '  + 
 '   <td> ' + fuelType +'</td>  '  + 
 '   </tr>  '  + 
 '   <tr>  '  + 
 '   <td><strong>Pump Price</strong></td>  '  + 
 '   <td>£' + pumpPrice +'</td>  '  + 
 '   </tr>  '  + 
 '   </tbody>  '  + 
 '  </table>  ' ; 
  var subject = 'Receipt for Fueller Transaction : ' + transactionNo;
  dispatchMail(subject, message);
}

function dispatchMail(subject, message) {
  
  var recipientsTO = "gordon@fuellerapp.com";
  var recipientsCC = "joe@fuellerapp.com";
  var html = message;

  MailApp.sendEmail({
    to: recipientsTO,
    cc: recipientsCC,
    subject: subject,
    htmlBody: html
  });
}



