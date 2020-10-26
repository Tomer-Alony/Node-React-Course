const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
    <html>
      <body>
        <div>
          <h3>I'd like your input!</h3>
          <p>Please answer the following question: </p>
          <div>${survey.body}</div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>            
          </div>  
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
          </div>
        </div>  
      </body>
    </html>
  `;
};