//import bank from "./bank";
const laptopMenuElement = document.getElementById("laptopMenu");
const laptopNameElement = document.getElementById("laptopName");
const laptopPriceElement = document.getElementById("laptopPrice");
const laptopImageElement = document.getElementById("laptopImage");
const laptopDescriptionElement = document.getElementById("laptopDescription");
const imageBaseUrl = "https://hickory-quilled-actress.glitch.me/"; 
const loanButtonElement = document.getElementById("loan");
const payLaptopElement = document.getElementById("pay");
const workButtonElement = document.getElementById("work");
const transferButtonElement = document.getElementById("transferBank");
const payLoanButtonElement = document.getElementById("payLoan");
const balanceElement = document.getElementById("balance");
const debtElement = document.getElementById("debt");
const salaryElement = document.getElementById("salary");


let laptops = [];
let features = [];

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToMenu(laptops));

const addLaptopsToMenu = (laptops) => {
    laptops.forEach(x => addLaptopToMenu(x))
    laptopNameElement.innerHTML = laptops[0].title;
    laptopPriceElement.innerHTML = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'SEK' }).format(laptops[0].price));
    laptopDescriptionElement.innerHTML = laptops[0].description;
    laptopImageElement.innerHTML = laptops[0].image;
    laptopImageElement.setAttribute ('src', (imageBaseUrl + laptops[0].image));

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
    laptopPriceElement.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'SEK' }).format(selectedLaptop.price));
    laptopDescriptionElement.textContent = selectedLaptop.description;
    laptopImageElement.setAttribute('src', (imageBaseUrl + selectedLaptop.image));
    
}
let balance = 0;
let debt = 0;
let salary = 0;

const deposit = amount => {
    balance += amount;
    
    balanceElement.innerHTML= (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'SEK' }).format(balance)).toString();

}
const earn = amount => {
    salary += amount;
    salaryElement.innerHTML= (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'SEK' }).format(salary)).toString();


}
const withdraw = amount => {
    balance-=amount;
    balanceElement.innerHTML=(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'SEK' }).format(balance)).toString();

}
const paySalary = amount => {
    salary-=amount;
    salaryElement.innerHTML= (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'SEK' }).format(salary)).toString();

}
const transfer = amount => {
    let ten = amount/10;
    let rest = amount - ten;
    let rest2 = amount - debt;
    if (debt<ten){
        loanPayment(debt);
        deposit (rest2);

    }
    else if (debt>0) {
        loanPayment(ten);
        deposit (rest);
    }
    else{
        deposit (amount);
    }
    paySalary(amount)
}
const getDebt = amount => {
    debt+=amount;
    debtElement.innerHTML=(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'SEK' }).format(debt)).toString();

}
const loanPayment = amount => {
    debt-=amount;
    debtElement.innerHTML=(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'SEK' }).format(debt)).toString();
    
}
const getBalance = () => {
    return balance;
}
const bank = {
    deposit,
    withdraw,
    getBalance,
}


laptopMenuElement.addEventListener("click", handleLaptopMenuChange);

const handleLoanButton = e => {
    const aNumber = Number(window.prompt("Type a number", ""));
    if (aNumber<=(balance*2) & debt==0) {
        deposit(aNumber);
        getDebt (aNumber)
        console.log("debt" + debt);
        console.log("balance " + balance);
    }
    else if (debt>0){
        alert("You can only have one loan");
    }
    else {
        alert("You don't have enough money");
    }


}
loanButtonElement.addEventListener("click", handleLoanButton);

const handleWorkButton = e => {
    earn(100);
    console.log('You just earned' + salary);
    

}
const handleTransferButton =  e => {
    console.log ("balance before " + balance);
    console.log("debt before" + debt);
    console.log ("salary before" + salary);
    transfer (salary);
    console.log("debt now" + debt);
    console.log("balance now " + balance);
    console.log ("salary now" + salary);

}
const handlePayLoanButton = e => {
    let salary2=salary;
    if (salary2 > debt) {
        alert ("you pay to much")
        console.log ("debt" + debt)
        console.log ("salary" + salary)
    }
    else {
    loanPayment(salary2);
    paySalary (salary2);
    console.log ("debt" + debt)
    console.log ("salary" + salary)
    }
}
const handlePayButton = e => {
    if (balance>=laptopPriceElement.innerHTML) {
        console.log ("balance before:" + balance);
        withdraw (laptopPriceElement.innerHTML);
        console.log ("balance after" + balance);
        console.log (laptopPriceElement.innerHTML)

    }
    else {
        alert("You can't afford this computer");
    }
}

payLaptopElement.addEventListener("click", handlePayButton);
workButtonElement.addEventListener("click", handleWorkButton);
transferButtonElement.addEventListener("click", handleTransferButton);
payLoanButtonElement.addEventListener("click", handlePayLoanButton);



