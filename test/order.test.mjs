import chai from 'chai';
import chaiHttp from 'chai-http';
import { app as server } from '../src/index.mjs';
const should = chai.should();

chai.use(chaiHttp);

let token;

describe('Orders API', () => {
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

  let createdOrderId;

  it('should get all orders', (done) => {
    chai.request(server)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should create a new order', (done) => {
    const order = {
      item: 'Test Item',
      quantity: 1,
    };
    chai.request(server)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('item').eql('Test Item');
        createdOrderId = res.body._id;
        done();
      });
  });

  it('should update an existing order', function(done) {
    this.timeout(30000); // Aumentando o tempo limite para 30000ms
    const updatedOrder = {
      item: 'Updated Item',
    };
    chai.request(server)
      .put(`/api/orders/${createdOrderId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedOrder)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('item').eql('Updated Item');
        done();
      });
  });

  it('should delete an order', function(done) {
    this.timeout(30000); // Aumentando o tempo limite para 30000ms
    chai.request(server)
      .delete(`/api/orders/${createdOrderId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});