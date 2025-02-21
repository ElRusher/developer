import chai from 'chai';
import chaiHttp from 'chai-http';
import { app as server } from '../src/index.mjs';
const should = chai.should();

chai.use(chaiHttp);

let token;

describe('Delivery Persons API', () => {
  before((done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        token = res.body.token;
        done();
      });
  });

  let createdPersonId;

  it('should get all delivery persons', (done) => {
    chai.request(server)
      .get('/api/delivery-persons')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should create a new delivery person', (done) => {
    const deliveryPerson = {
      name: 'Test Person',
      phone: '123456789',
    };
    chai.request(server)
      .post('/api/delivery-persons')
      .set('Authorization', `Bearer ${token}`)
      .send(deliveryPerson)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Test Person');
        createdPersonId = res.body._id;
        done();
      });
  });

  it('should update an existing delivery person', function(done) {
    this.timeout(30000); // Aumentando o tempo limite para 30000ms
    const updatedPerson = {
      name: 'Updated Person',
    };
    chai.request(server)
      .put(`/api/delivery-persons/${createdPersonId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedPerson)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Updated Person');
        done();
      });
  });

  it('should delete a delivery person', function(done) {
    this.timeout(30000); // Aumentando o tempo limite para 30000ms
    chai.request(server)
      .delete(`/api/delivery-persons/${createdPersonId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});