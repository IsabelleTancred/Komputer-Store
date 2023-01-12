const balanceElement = document.getElementById("balance");
const loanElement = document.getElementById("loan");
const debtElement = document.getElementById("debt");
const salaryElement = document.getElementById("salary");
const workElement = document.getElementById("work");
const transferBankElement = document.getElementById("transferBank");
const payLoanElement = document.getElementById("payLoan");
const laptopMenuElement = document.getElementById("laptopMenu");
const laptopNameElement = document.getElementById("laptopName");
const laptopPriceElement = document.getElementById("laptopPrice");
const laptopImageElement = document.getElementById("laptopImage").src=("");
const laptopDescriptionElement = document.getElementById("laptopDescription");

let laptops = [];
let features = [];

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToMenu(laptops));

const addLaptopsToMenu = (laptops) => {
    laptops.forEach(x => addLaptopToMenu(x))
    laptopNameElement.innerHTML = laptops[0].title;
    laptopPriceElement.innerHTML = laptops[0].price;
    laptopDescriptionElement.innerHTML = laptops[0].description;
    laptopImageElement.baseURI = laptops[0].image;

}  

const addLaptopToMenu = (laptop) => {
    const laptopElement = document.createElement ("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopMenuElement.appendChild(laptopElement);
}

const handleLaptopMenuChange = e => {
    const selectedLaptop = laptops [e.target.selectedIndex];
    laptopNameElement.textContent = selectedLaptop.title;
    laptopPriceElement.textContent = selectedLaptop.price;
    laptopDescriptionElement.textContent = selectedLaptop.description;
    laptopImageElement.textContent = "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image;
    
}

laptopMenuElement.addEventListener("change", handleLaptopMenuChange);