// cdn axios

async function getData() {
    try {
        const response = await axios.get('http://localhost:3000/productos');
        console.log(response.data);
    } catch {
        console.log('error get');
    }
}
async function postData() {
    try {
        /**
         *     timestamp: Date;
    name: string;
    description: string;
    code: string;
    image: string;
    price: string | number;
    stock: number;
         */
        const response = await axios.post('http://localhost:3000/productos', {
            timestamp: new Date(),
            name: 'nuevo producto',
            description: 'nueva descripcion',
            code: 'nuevo codigo',
            image: 'nueva imagen',
            price: '100',
            stock: 10

        });
        console.log(response.data);
    } catch {
        console.log('error post');
    }
}
async function putData() {
    try {
        const response = await axios.put('http://localhost:3000/productos/5f0e7a9b0d1b8a1b4c4f4c0d', {
            timestamp: new Date(),
            name: 'nuevo producto',
            description: 'nueva descripcion',
            code: 'nuevo codigo',
        });
        console.log(response.data);
    } catch {
        console.log('error put');
    }
}
async function deleteData() {
    try {
        const response = await axios.delete('http://localhost:3000/api/productos/5e9f9f8f8d9c8d0f8c8d9c8d');
        console.log(response.data);
    } catch {
        console.log('error delete');
    }
}

Promise.all([getData(), postData(), putData(), deleteData()])
    .then(() => {
        console.log('done');
    })