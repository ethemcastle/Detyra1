let products = [
    {id: 1, name: 'Domate', category: 'Ushqimore', price: 50},
    {id: 2, name: 'Telekomande', category: 'Elektroshtepiake', price: 100},
    {id: 3, name: 'Makarona', category: 'Ushqimore', price: 200},
    {id: 4, name: 'Peshk', category: 'Ushqimore', price: 300},
    {id: 5, name: 'Çentro', category: 'Pajë', price: 1000},
]
let selectedProductId = null;

window.onload = function () {
    startTable();
};

const createProduct = () => {
    const name = document.getElementById('nameCreate').value;
    const category = document.getElementById('categoryCreate').value;
    const price = document.getElementById('priceCreate').value;
    const product = {
        id: products[products.length - 1].id + 1,
        name: name,
        category: category,
        price: price
    }
    products.push(product);
    startTable();
}

const updateProduct = () => {
    const name = document.getElementById('nameUpdate').value
    const category = document.getElementById('categoryUpdate').value
    const price = document.getElementById('priceUpdate').value
    const product = {
        id: parseInt(selectedProductId),
        name: name,
        category: category,
        price: price
    }
    products = products.map(pro => {
        if (pro.id === parseInt(selectedProductId)) {
            pro = product;
        }
        return pro
    });
    startTable()
}

const deleteProduct = () => {
    products = products.filter(x => x.id !== parseInt(selectedProductId));
    startTable()
}

const startTable = () => {
    const rows = document.getElementsByClassName('table')[0].getElementsByTagName('tbody')
    rows[0].innerHTML = '';
    for (let product of products) {
        const row = document.createElement('tr');
        row.addEventListener('click', function (e) {
            selectedProductId = e.path[2].firstChild.getElementsByTagName('a')[0].innerHTML;
            if (!selectedProductId)
                selectedProductId = e.path[3].firstChild.getElementsByTagName('a')[0].innerHTML;
        }, false);
        const col1 = document.createElement('td');
        const col2 = document.createElement('td');
        const col3 = document.createElement('td');
        const col4 = document.createElement('td');
        const col5 = document.createElement('td');
        const col6 = document.createElement('td');

        const ref1= document.createElement('a');
        const ref2= document.createElement('a');
        const ref3= document.createElement('a');
        const ref4= document.createElement('a');
        ref1.setAttribute('href', './detail.html');
        ref2.setAttribute('href', './detail.html');
        ref3.setAttribute('href', './detail.html');
        ref4.setAttribute('href', './detail.html');


        ref1.innerHTML = product.id;
        col1.appendChild(ref1);
        ref2.innerHTML = product.name;
        col2.appendChild(ref2);
        ref3.innerHTML = product.category;
        col3.appendChild(ref3);
        ref4.innerHTML = product.price;
        col4.appendChild(ref4);

        const icon1 = document.createElement('i');
        const icon2 = document.createElement('i');
        icon1.classList.add('bi');
        icon1.classList.add('bi-pencil');
        icon2.classList.add('bi');
        icon2.classList.add('bi-trash');

        col5.appendChild(icon1);
        col5.setAttribute("data-toggle", "modal");
        col5.setAttribute("data-target", "#updateModal");
        col6.appendChild(icon2);
        col6.setAttribute("data-toggle", "modal");
        col6.setAttribute("data-target", "#deleteModal");
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        row.appendChild(col5);
        row.appendChild(col6);

        rows[0].appendChild(row);
    }
}
