import chai from 'chai';
import chaiHttp from 'chai-http';
import { app as server } from '../src/index.mjs';
const should = chai.should();

chai.use(chaiHttp);

let token;

describe('Products API', () => {
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

  let createdProductId;

  it('should get all products', (done) => {
    chai.request(server)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should create a new product', (done) => {
    const product = {
      name: 'Test Product',
      price: 100,
      description: 'This is a test product',
      stock: 50,
    };
    chai.request(server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Test Product');
        createdProductId = res.body._id;
        done();
      });
  });

  it('should update an existing product', function(done) {
    this.timeout(30000); // Aumentando o tempo limite para 30000ms
    const updatedProduct = {
      name: 'Updated Product',
      price: 150,
      description: 'This is an updated test product',
      stock: 30,
    };
    chai.request(server)
      .put(`/api/products/${createdProductId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedProduct)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Updated Product');
        done();
      });
  });

  it('should delete a product', function(done) {
    this.timeout(30000); // Aumentando o tempo limite para 30000ms
    chai.request(server)
      .delete(`/api/products/${createdProductId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});