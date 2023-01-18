const laptopMenuElement = document.getElementById("laptopMenu");
const laptopNameElement = document.getElementById("laptopName");
const laptopPriceElement = document.getElementById("laptopPrice");
const laptopImageElement = document.getElementById("laptopImage");
const laptopDescriptionElement = document.getElementById("laptopDescription");
const imageBaseUrl = "https://hickory-quilled-actress.glitch.me/";
const featureListElement = document.getElementById("featureList");
const balanceElement = document.getElementById("balance");
const debtElement = document.getElementById("debt");
const salaryElement = document.getElementById("salary");
const debtDivElement = document.getElementById("debtSection");
const debtInfoElement = document.getElementById("debtInfo");
const loanButtonElement = document.getElementById("loan");
const payLaptopElement = document.getElementById("pay");
const workButtonElement = document.getElementById("work");
const transferButtonElement = document.getElementById("transferBank");
const payLoanButtonElement = document.getElementById("payLoan");

let laptops = [];
let features = [];
let firstLaptop = [];

// function to convert a number to be displayed as SEK
function toSek(num) {
  return new Intl.NumberFormat("se-DE", {
    style: "currency",
    currency: "SEK",
  }).format(num);
}
//function for changing innerHTML to a new value
function display(element, value) {
  return (element.innerHTML = value);
}

//function too add features to a list and display them. First clear the list if it already has items in it.
const addFeatures = (features) => {
  while (featureListElement.hasChildNodes()) {
    featureListElement.removeChild(featureListElement.firstChild);
  }
  features.forEach((item) => {
    let dt = document.createElement("dt");
    dt.innerText = item;
    featureListElement.appendChild(dt);
  });
};

//fetch API
fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptopsToMenu(laptops));

//function to add laptops to menu select, start-page shows the first laptop in select-menu
const addLaptopsToMenu = (laptops) => {
  let firstLaptop = laptops[0];
  laptops.forEach((x) => addLaptopToMenu(x));
  display(laptopNameElement, firstLaptop.title);
  display(laptopPriceElement, toSek(firstLaptop.price));
  display(laptopDescriptionElement, firstLaptop.description);
  laptopImageElement.setAttribute("src", imageBaseUrl + firstLaptop.image);
  features = firstLaptop.specs;
  addFeatures(features);
};

//function to add each laptop from API as an option in the select menu
const addLaptopToMenu = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  laptopMenuElement.appendChild(laptopElement);
};

//function which handles changes in the select menu. Also catches error in image display.
const handleLaptopMenuChange = (e) => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  laptopNameElement.textContent = selectedLaptop.title;
  laptopPriceElement.textContent = toSek(selectedLaptop.price);
  laptopDescriptionElement.textContent = selectedLaptop.description;
  laptopImageElement.setAttribute("src", imageBaseUrl + selectedLaptop.image);
  laptopImageElement.onerror = function () {
    changeImage();
  };
  function changeImage() {
    laptopImageElement.setAttribute(
      "src",
      imageBaseUrl + changeImgFormat(selectedLaptop.image)
    );
  }
  features = selectedLaptop.specs;
  addFeatures(features);
};

laptopMenuElement.addEventListener("click", handleLaptopMenuChange);

// function to change img format from jpg to png, or from png to jpg
function changeImgFormat(str) {
  let str1 = "jpg";
  let str2 = "png";
  if (str.includes(str1)) {
    return str.replace(/jpg/i, str2);
  } else if (str.includes(str2)) {
    return str.replace(/png/i, str1);
  }
}

/*below Bank functions, and bank logic should probably be in an own JS-file*/

let balance = 0;
let debt = 0;
let salary = 0;

//sets initial values to be displayed as SEK
display(balanceElement, toSek(balance));
display(debtElement, toSek(debt));
display(salaryElement, toSek(salary));

//function to see if there's a current loan/debt
function hasLoan(debt) {
  if (debt <= 0) {
    return false;
  } else {
    return true;
  }
}

//function which hides or shows elements regarding loan depending on if there's a current loan or not
function hideOrShowLoanElements(debt) {
  if (!hasLoan(debt)) {
    debtDivElement.style.display = "none";
    payLoanButtonElement.style.display = "none";
    debtInfoElement.style.display = "none";
  } else {
    debtDivElement.style.display = "block";
    payLoanButtonElement.style.display = "block";
    debtInfoElement.style.display = "block";
  }
}

//function update and display value when deposit
const deposit = (amount) => {
  balance += amount;
  display(balanceElement, toSek(balance));
};
const earn = (amount) => {
  salary += amount;
  display(salaryElement, toSek(salary));
};
const withdraw = (amount) => {
  balance -= amount;
  display(balanceElement, toSek(balance));
};
const clearSalary = (amount) => {
  salary -= amount;
  display(salaryElement, toSek(salary));
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
  clearSalary(amount);
};

const getDebt = (amount) => {
  debt += amount;
  display(debtElement, toSek(debt));
  hideOrShowLoanElements(debt);
};
const loanPayment = (amount) => {
  debt -= amount;
  display(debtElement, toSek(debt));
  hideOrShowLoanElements(debt);
};

//function to handle input value from loan button, logic to check if loan is possible and handling loan.
const getLoan = (input) => {
  if ((input <= balance * 2) & (debt == 0)) {
    deposit(input);
    getDebt(input);
  } else if (input > 0) {
    alert("You can only have one loan");
  } else if (input > balance * 2) {
    alert("You don't have enough money");
  } else {
    alert("Wrong input, use digits");
  }
};

//function to handle logic when repayLoan have been pressed
const repayLoan = (salary) => {
  let restSalary = salary - debt;
  if (salary > debt) {
    loanPayment(debt);
    deposit(restSalary);
  } else {
    loanPayment(salary);
  }
  clearSalary(salary);
};
//function to check if purchase is possible, and if so handles purchase
const buyLaptop = () => {
  if (balance >= fromSek(laptopPriceElement.innerHTML)) {
    withdraw(fromSek(laptopPriceElement.innerHTML));
    alert(
      "Congratulation! You are now the owner of the " +
        laptopNameElement.innerHTML
    );
  } else {
    alert("You can't afford this computer");
  }
};
/*Below are functions to handle button inputs, should probably an own JS-file as well*/

//function to handle that loan button has been pressed
const handleLoanButton = (e) => {
  const aNumber = Number(window.prompt("Type a number", ""));
  getLoan(aNumber);
};
loanButtonElement.addEventListener("click", handleLoanButton);

//function to handle that work button has been pressed
const handleWorkButton = (e) => {
  earn(100);
};
workButtonElement.addEventListener("click", handleWorkButton);

//function to handle that transfer button has been pressed
const handleTransferButton = (e) => {
  transfer(salary);
};
transferButtonElement.addEventListener("click", handleTransferButton);

//function to handle when repay loan has been pressed
const handlePayLoanButton = (e) => {
  repayLoan(salary);
};

payLoanButtonElement.addEventListener("click", handlePayLoanButton);

function fromSek(str) {
  const res = str.replace(/\D/g, "");
  return res / 100;
}

const handlePayButton = (e) => {
  buyLaptop();
};
payLaptopElement.addEventListener("click", handlePayButton);

hideOrShowLoanElements(debt);
