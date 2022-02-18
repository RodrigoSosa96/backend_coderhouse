import request from 'supertest';
import { expect } from 'chai';
import { mockProductos } from './utils/mockData';

const server = request('http://localhost:3000');

describe("GET /productos main", () => {
    it("should return 200", async () => {
        const response = await server.get("/productos");
        expect(response.status).to.equal(200);
    });
})

describe("GET /productos/listar/:id?", () => {
    it("should return an array of products", async () => {
        const response = await server.post('/productos/listar');
        expect(response.status).to.equal(200);

        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.have.property('timestamp');
        expect(response.body[0]).to.have.property('name');
        expect(response.body[0]).to.have.property('description');
        expect(response.body[0]).to.have.property('code');
        expect(response.body[0]).to.have.property('image');
        expect(response.body[0]).to.have.property('price');
        expect(response.body[0]).to.have.property('stock');

    });
})


describe('POST /productos/agregar', () => {
    // use mockProductos to post a new product
    it('should return a new product', async () => {
        const newProd = mockProductos(1);
        const response = await server.post('/productos/agregar').send(newProd);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('timestamp');
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('description');
        expect(response.body).to.have.property('code');
        expect(response.body).to.have.property('image');
        expect(response.body).to.have.property('price');
        expect(response.body).to.have.property('stock');

    });
});
describe('PUT /productos/actualizar/:id', () => {

    it('should return a 200 response', async () => {
        const response = await server.put('/productos/actualizar/5f0e7a9b0d1b8a1b4c4f4c0d');    //! otro id
        expect(response.status).to.equal(200);
    });
}
);
describe('DELETE /productos/borrar/:id', () => {
    it('should return a 200 response', async () => {
        const response = await server.delete('/productos/borrar/5f0e7a9b0d1b8a1b4c4f4c0d'); //! otro id
        expect(response.status).to.equal(200);
    });
}
);