function summarize_arXiv_papers() {

  // set variables
  var gpt_api_key = 'OPENAI_API_KEY';
  var query = 'YOUR_QUERY';
  var max_results = '3';
  var today = new Date();
  var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  var date = yesterday.toISOString().slice(0, 10).replace(/-/g, "");
  var url = 'http://export.arxiv.org/api/query?search_query=' + query + '&max_results=' + max_results + '&sortBy=lastUpdatedDate&sortOrder=descending&submittedDate[' + date + ',%20]&max_results=' + max_results;
  console.log(url);
  // request arXiv papers
  var response = UrlFetchApp.fetch(url);
  // var xml = response.getContentText();
  // var document = XmlService.parse(xml);
  // var root = document.getRootElement();
  // var namespace = root.getNamespace();
  // var entries = root.getChild('entry', namespace);

  var xml = response.getContentText();
  var document = XmlService.parse(xml);
  var root = document.getRootElement();
  var namespace = root.getNamespace();
  var entries = root.getChildren("entry", namespace);
  var title = [];
  var summary = [];
  var link = [];
  var papers = [];

  // summarize papers using ChatGPT API
  for (var i = 0; i < entries.length; i++) {
    var namespace = root.getNamespace();
    title.push(entries[i].getChild("title", namespace).getText());
    var summary_request = '#命令書:あなたは世界一のAI研究者です。入力と制約を元に、出力してください。#制約:出力は20文字以内とすること。#入力:' + entries[i].getChild('summary', namespace).getText() + "#出力:\"\"\"{}\"\"\"";
    var summary_response = UrlFetchApp.fetch('https://api.openai.com/v1/completions', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + gpt_api_key
      },
      payload: JSON.stringify({
        model: "text-davinci-003",
        prompt: summary_request,
        max_tokens: 1000
      })
    });
    summary.push(JSON.parse(summary_response.getContentText()).choices[0].text);
    link.push(entries[i].getChild('id', namespace).getText());
    var paper = [title[i], summary[i], link[i]];
    console.log(paper);
    papers.push(paper);
  }
  console.log(papers);
  // send email with summarized papers
  var recipient = 'YOUR_MAIL_ADDRESS';
  var subject = 'arXiv papers summary';
  var body = '';
  for (var j = 0; j < papers.length; j++) {
    body += 'Title: ' + papers[j][0] + '\n\n';
    body += 'Summary: ' + papers[j][1] + '\n\n';
    body += 'Link: ' + papers[j][2] + '\n\n\n';
  }
  MailApp.sendEmail(recipient, subject, body);
}
