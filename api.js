const laptopMenuElement = document.getElementById("laptopMenu");
const laptopNameElement = document.getElementById("laptopName");
const laptopPriceElement = document.getElementById("laptopPrice");
const laptopImageElement = document.getElementById("laptopImage");
const laptopDescriptionElement = document.getElementById("laptopDescription");
const imageBaseUrl = "https://hickory-quilled-actress.glitch.me/"; 
const featureListElement = document.getElementById("featureList");


let laptops = [];
let features = [];

// function too add SEK to any number
function toSek (num){
    return (new Intl.NumberFormat('se-DE',{ style: 'currency', currency: 'SEK' }).format(num));
}

//fetch API
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToMenu(laptops));

//function to add laptops to menu, sets the first view to show the first laptop from the API     
const addLaptopsToMenu = (laptops) => {
    laptops.forEach(x => addLaptopToMenu(x))
    laptopNameElement.innerHTML = laptops[0].title;
    laptopPriceElement.innerHTML = toSek(laptops[0].price);
    laptopDescriptionElement.innerHTML = laptops[0].description;
    laptopImageElement.innerHTML = laptops[0].image;
    laptopImageElement.setAttribute ('src', (imageBaseUrl + laptops[0].image));
    features = laptops[0].specs;
    features.forEach((item)=>{
        let dt = document.createElement("dt");
        dt.innerText = item;
        featureListElement.appendChild(dt);
      })

}  

//function to add each laptop from API as an option in the select menu
const addLaptopToMenu = (laptop) => {
    const laptopElement = document.createElement ("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopMenuElement.appendChild(laptopElement);

}

const handleLaptopMenuChange = e => {
    const selectedLaptop = laptops [e.target.selectedIndex];
    laptopNameElement.textContent = selectedLaptop.title;
    laptopPriceElement.textContent = toSek(selectedLaptop.price);
    laptopDescriptionElement.textContent = selectedLaptop.description;
    laptopImageElement.setAttribute('src', (imageBaseUrl + selectedLaptop.image));
    features = selectedLaptop.specs;
    while(featureListElement.hasChildNodes())
    {
        featureListElement.removeChild(featureListElement.firstChild)
    }
    features.forEach((item)=>{
        let dt = document.createElement("dt");
        dt.innerText = item;
        featureListElement.appendChild(dt);
      })
      
      

}
laptopMenuElement.addEventListener("click", handleLaptopMenuChange);

const balanceElement = document.getElementById("balance");
const debtElement = document.getElementById("debt");
const salaryElement = document.getElementById("salary");
const debtTextElement = document.getElementById("debtText");
const debtDivElement = document.getElementById("debtSection");

let balance = 0;
let debt = 0;
let salary = 0;

function hasLoan(debt) {
  if (debt <= 0) {
    return false;
  } else {
    return true;
  }
}

function hasSalary(salary) {
  if (salary <= 0) {
    return false;
  } else {
    return true;
  }
}

function hideOrShowLoanElements(debt) {
  if (!hasLoan(debt)) {
    debtDivElement.style.display = "none";
    payLoanButtonElement.style.display = "none";
  }
  else {
    debtDivElement.style.display = "block";
    payLoanButtonElement.style.display = "block";
  }
}

balanceElement.innerHTML = toSek(balance);
debtElement.innerHTML = toSek(debt);
salaryElement.innerHTML = toSek(salary)


const deposit = (amount) => {
  balance += amount;
  balanceElement.innerHTML = toSek(balance);
};
const earn = (amount) => {
  salary += amount;
  salaryElement.innerHTML = toSek(salary);
};
const withdraw = (amount) => {
  balance -= amount;
  balanceElement.innerHTML = toSek(balance);
};
const paySalary = (amount) => {
  salary -= amount;
  salaryElement.innerHTML = toSek(salary);
};

const transfer = (amount) => {
  let ten = amount / 10;
  let rest = amount - ten;
  let debtRest = amount - debt;
  if (debt < ten) {
    loanPayment(debt);
    deposit(debtRest);
  } else if (debt > 0) {
    loanPayment(ten);
    deposit(rest);
  } else {
    deposit(amount);
  }
  paySalary(amount);
};

const getDebt = (amount) => {
  debt += amount;
  debtElement.innerHTML = toSek(debt);
  hideOrShowLoanElements(debt);
};
const loanPayment = (amount) => {
  debt -= amount;
  debtElement.innerHTML = toSek(debt);
  hideOrShowLoanElements(debt);
};

const bank = {
  deposit,
  earn,
  withdraw,
  paySalary,
  transfer,
  getDebt,
  loanPayment,
};

const loanButtonElement = document.getElementById("loan");
const payLaptopElement = document.getElementById("pay");
const workButtonElement = document.getElementById("work");
const transferButtonElement = document.getElementById("transferBank");
const payLoanButtonElement = document.getElementById("payLoan");

const handleLoanButton = (e) => {
  const aNumber = Number(window.prompt("Type a number", ""));
  if ((aNumber <= balance * 2) & (debt == 0)) {
    deposit(aNumber);
    getDebt(aNumber);
  } else if (debt > 0) {
    alert("You can only have one loan");
  } else if ((aNumber > balance * 2)){
    alert("You don't have enough money");
  }
  else{
    alert("Wrong input, use digits");
  }
};
loanButtonElement.addEventListener("click", handleLoanButton);

const handleWorkButton = (e) => {
  earn(100);
};
workButtonElement.addEventListener("click", handleWorkButton);

const handleTransferButton = (e) => {
  transfer(salary);
};

transferButtonElement.addEventListener("click", handleTransferButton);

const handlePayLoanButton = (e) => {
  let salary2 = salary;
  if (salary2 > debt) {
    alert("you pay to much");
  } else {
    loanPayment(salary2);
    paySalary(salary2);
  }
};

payLoanButtonElement.addEventListener("click", handlePayLoanButton);

function fromSek (str){
  const res = str.replace(/\D/g, "");
  return (res/100);
}
const handlePayButton = (e) => {
  if (balance >=fromSek(laptopPriceElement.innerHTML)) {
    withdraw(fromSek(laptopPriceElement.innerHTML));
    alert("Congratulation! You are now the owner of the " + laptopNameElement.innerHTML );
  } else {
    alert("You can't afford this computer");
  }
};

payLaptopElement.addEventListener("click", handlePayButton);

hideOrShowLoanElements (debt);