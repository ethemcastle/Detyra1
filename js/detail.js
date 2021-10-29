var product = products.find((x) => selectedProductId === x.id)
document.getElementsByClassName('header')[0].innerHTML = product.name
// document.getElementsByClassName('header')[0].innerHTML = product.name
// window.location('../html/home')
