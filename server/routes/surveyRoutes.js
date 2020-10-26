const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) =>
    res.send('Thanks for voting!!')
  );

  app.post('/api/surveys/webhook', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    const mapped = _.map(req.body, ({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return { ...match, email };
      }
    });

    const compact = _.compact(mapped);
    const uniqBy = _.uniqBy(compact, 'surveyId', 'email');
    _.each(uniqBy, ({ email, choice, surveyId }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        }
      ).exec();
    });

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email) => ({
        email: email.trim(),
      })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

// _.chain(req.body)
// .map(({ email, url }) => {
//   const match = p.test(new URL(url).pathname);
//   if (match) {
//     return { ...match, email };
//   }
// })
// .compact()
// .uniqBy('surveyId', 'email')
// .each(({ email, choice, surveyId }) => {
//   const sid = mongoose.Types.ObjectId(surveyId);

//   Survey.updateOne(
//     {
//       _id: sid,
//       recipients: {
//         $elemMatch: { email: email, responded: false },
//       },
//     },
//     {
//       $inc: { [choice]: 1 },
//       $set: { 'recipients.$.responded': true },
//       lastResponded: new Date(),
//     },
//     (err, res) => {
//       console.log(`${err}, ${res}`);
//       debugger;
//     }
//   ).exec();
// });
