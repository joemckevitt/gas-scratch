function doGet() {
  var output =  HtmlService
      .createTemplateFromFile('Index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.NATIVE);
      
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');

  return output;
}