function doGet() {
  var output =  HtmlService
      .createTemplateFromFile('Index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.NATIVE);
      
      //HtmlService.createHtmlOutput('<b>Hello, world!</b>');
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');

  return output;
}