let categories = [
    'Fruta',
    'Perime',
    'Pajë',
    'Elektronike',
    'Ushqim'
]

let products = [
    {
        id: 1,
        name: 'Domate',
        category: categories[1],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        image: '../images/sultjash.jpg',
        price: 50
    },
    {
        id: 2,
        name: 'Telekomande',
        category: categories[3],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        image: '../images/sultjash.jpg',
        price: 100
    },
    {
        id: 3,
        name: 'Makarona',
        category: categories[4],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        image: '../images/sultjash.jpg',
        price: 200
    },
    {
        id: 4,
        name: 'Peshk',
        category: categories[4],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        image: '../images/sultjash.jpg',
        price: 300
    },
    {
        id: 5,
        name: 'Çentro',
        category: categories[2],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        image: '../images/sultjash.jpg',
        price: 1000
    },
]

let cartProducts = []
let users = [{username: 'Ethem', password: 'Kalaja'}]

window.onload = function () {
    renderLogIn();
};

function loopProducts() {
    document.getElementsByClassName('menu')[0].style.display = 'block';
    document.getElementsByClassName('content')[0].innerHTML = ''
    for (let product of products) {
        document.getElementsByClassName('content')[0].innerHTML += renderProducts(product);
    }
}

function selectProduct(id) {
    const product = returnProduct(id);
    document.getElementsByClassName('content')[0].innerHTML = `
    <div class="product">
    <div class="back" onclick="loopProducts()">X</div>
         <div class="image"><img src=${product.image} alt="image"></div>
         <h4>${product.name}</h4>
         <b>Kategoria: ${product.category}</b>
         <div>${product.description}</div>
         <div class="price">Cmimi: ${product.price} L</div>
         <input type="number">
         <button type="button" class="btn btn-dark" onclick="addToCart(${product.id},
          parseInt(document.getElementsByTagName('input')[0].value))">Fute ne shport</button>
     </div>
     `
}

function renderProducts(product) {
    return `
    <div class="product">
        <div class="image" onclick="selectProduct(${product.id})"><img src=${product.image} alt="image"></div>
        <h4>${product.name}</h4>
        <b>Kategoria: ${product.category}</b>
        <div class="price">Cmimi: ${product.price} L</div>
        <button type="button" class="btn btn-dark" onclick="addToCart(${product.id})">Fute ne shport</button>
    </div>
`
}

function renderCheckout() {
    let template = document.getElementsByClassName('content')[0];
    template.innerHTML = '';
    const ids = [];
    for (let product of cartProducts) {
        if (product.id in ids) {
        } else {
            let amount = 0; //sasia per produkt
            let sum = 0; //shuam per e cmimit produkt
            const pros = cartProducts.filter(x => x.product.id === product.id); // Filtron te gjitha produktet me te njejte id
            ids.push(product.id); // ruan te gjitha id e produkteve sepse psh nese kemi 3 produkte thjesht i mbledhim nje her dhe jo tre her
            for (let pro of pros) {
                amount += pros.amount; // amount sum
                sum += pros.amount*pros.product.price; // shuma e te gjithave
            }
            template.innerHTML += renderOneProductCheckout({product: product.product, amount: amount, sum: sum}); //ben render nje rresht per nje produkt
            amount = 0;
        }
    }
}

function renderOneProductCheckout(product) {

    return `
        <div class="row">
        <img class="col-sm" src="${product.product.image}" alt="image">
        <div class="col-sm">
        <div><b>Produkti: </b><span> ${product.product.name}</span></div>
        <div><b>Category: </b><span> ${product.product.category}</span></div>
        </div>
        <div class="col-sm">
            Sasia: <span>1</span>
        </div>
        <div class="col-sm">Cmimi: <span>${product.product.price} </span><span>lek</span></div>
        <div class="col-sm">Total: <span>${product.sum} </span><span>lek</span></div>
        <hr />
    </div>
    `
}

function returnProduct(id) {
    return products.find(x => x.id = id);
}

function addToCart(id, amount = 1) {
    const product = returnProduct(id);
    cartProducts.push({product, amount});
}

function handleSubmit() {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    for (let user of users) {
        if (username.value === user.username && password.value === user.password)
            loopProducts();
        else
            document.getElementById('message').style.display = 'block';
    }
}

function renderLogIn() {
    document.getElementsByClassName('menu')[0].style.display = 'none';
    document.getElementsByClassName('content')[0].innerHTML = `
        <div class="login">
            <form class="container">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password">
                </div>
                <div id="message">Username ose passwords eshte i gabuar</div>
                <div onclick="handleSubmit()" class="btn btn-primary">Log In</div>
            </form>
        </div>
    `
}

function signOut() {
    location.reload();
}
