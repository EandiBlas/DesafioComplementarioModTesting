import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080")

describe('Carts endpoints', () => {


    describe('POST /api/carts', () => {
        const obj = {
            products: []
        };
        it('Carrito creado con exito', async () => {
            const response = await request.post('/api/carts').send(obj);
            console.log(response.body)
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('Products');
        });
    });


    // describe('GET /api/carts/', () => {
    //     it('Obtener todos los carritos', async () => {
    //         const response = await request.get('/api/carts/')
    //         expect(response.status).to.equal(200);
    //         expect(response.body).to.be.an('array');
    //     });
    // });


    // describe('GET /api/carts/:cid', () => {
    //     it('Obtener un carrito por el id', async () => {
    //         const response = await request.get('/api/carts/:cid')
    //         expect(response.status).to.equal(200);
    //         expect(response.body).to.have.property('cart');
    //     });
    // });


    describe('DELETE /api/carts/:cid/product/:pid', () => {
        it('Eliminar un producto dado del carrito', async () => {
            const response = await request.delete('/api/carts/:cid/product/:pid');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('cart');
        });
    });


    describe('DELETE /api/carts/:cid', () => {
        it('Eliminar todos los productos de un carrito', async () => {
            const response = await request.delete('/api/carts/:cid');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('cart');
        });
    });


    describe('PUT /api/carts/:cid/products/:pid', () => {
        it('Actualizar la cantidad de un producto específico del carrito', async () => {
            const response = await request.put('/api/carts/:cid/products/:pid').send({ quantity: 1 });
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('cart');
        });
    });


    describe('GET /api/carts/:cid/purchase', () => {
        it('Debería avanzar con el proceso de compra', async () => {
            const response = await request.get('/api/carts/:cid/purchase');
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('message').that.equals('Compra finalizada con éxito');
        });
    });


})

describe('Products endpoints', () => {


    describe('POST /api/products', () => {
        const product = {
            "title": "Probando",
            "description": "Probando123",
            "price": 515,
            "stock": 22,
            "thumbnail": "urldelaimagen.png",
            "code": "Testing30",
            "category": "test"
        };
        it('POST - Created a product', async () => {
            const response = await request.post('/api/products').send(product);
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('product');
        });
    });


    it('GET -- product list', async () => {
        const response = await request.get('/api/products');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('products').that.is.an('array');
    });

    it('GET -- product by ID', async () => {
        const pid = 'GETOBJIDMOONSE';
        const response = await request.get(`/api/products/${pid}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('product');
    });

    it('PUT -- product change property', async () => {
        const pid = 'IGETOBJIDMOONSE';
        const product = {
            price: 12500.99,
            stock: 150
        };

        const response = await request.put(`/api/products/${pid}`).send(product);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('product');
    });

    it('Delete -- product deleted by ID', async () => {
        const pid = 'GETOBJIDMOONSE';
        const response = await request.delete(`/api/products/${pid}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('product');
    });

})

describe('Users endpoints', () => {

    it('POST -- Register a new user', async () => {
        const userData = {
            first_name: 'Tafuerte',
            last_name: 'Roke',
            username: 'mrRoke',
            email: 'keseso@gugulun.com',
            age: 89,
            password: 'toiviejito',
        };

        const response = await request.post('/api/auth/login/register').send(userData);
        expect(response.status).to.equal(201);
    });

    it('POST -- Login', async () => {
        const userData = {
            username: 'mrRoke',
            password: 'contraseña'
        };

        const response = await request.post('/api/auth/login/login').send(userData);
        expect(response.status).to.equal(200);
        expect(response.redirects[0]).to.contain('/api/current');
    });

    it('PUT -- Change user role', async () => {
        const uid = 'UserIDAllReadyRegister';
        const response = await request.put(`/api/auth/login/premium/${uid}`);
        expect(response.status).to.equal(200);
    });

})