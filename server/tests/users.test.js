const app = require('../app');
const session = require('supertest-session');

describe('User Endpoints', () => {
  const userNumber = Math.floor(Math.random() * 9999);

  test('Should Register a new user', async () => {
    const bodyContent = {
      firstName: 'First' + userNumber,
      middleName: 'Middle' + userNumber,
      lastName: 'Last' + userNumber,
      password: 'pass' + userNumber,
    };

    session(app).post('/user/register').send(bodyContent).expect(200);
  });

  describe('Authenticated endpoints', () => {
    var authenticatedSession;

    // test('Should login an existing user', (done) => {
    beforeEach((done) => {
      const initialSession = session(app);

      const bodyContent = {
        email: `first.last@us.af.mil`,
        password: `first`,
      };
      initialSession
        .post('/user/login')
        .send(bodyContent)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          authenticatedSession = initialSession;
          return done();
        });
    });

    test('Should return details about logged-in user', (done) => {
      authenticatedSession.get('/user/details').expect(200).end(done);
    });

    test('Should logout a logged-in user', (done) => {
      authenticatedSession.post('/user/logout').expect(200).end(done);
    });
  });
});
