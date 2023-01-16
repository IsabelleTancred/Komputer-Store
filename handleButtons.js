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
    console.log("debt" + debt);
    console.log("balance " + balance);
  } else if (debt > 0) {
    alert("You can only have one loan");
  } else {
    alert("You don't have enough money");
  }
};
loanButtonElement.addEventListener("click", handleLoanButton);

const handleWorkButton = (e) => {
  earn(100);
  console.log("You just earned" + salary);
};
workButtonElement.addEventListener("click", handleWorkButton);

const handleTransferButton = (e) => {
  console.log("balance before " + balance);
  console.log("debt before" + debt);
  console.log("salary before" + salary);
  transfer(salary);
  console.log("debt now" + debt);
  console.log("balance now " + balance);
  console.log("salary now" + salary);
};
transferButtonElement.addEventListener("click", handleTransferButton);

const handlePayLoanButton = (e) => {
  let salary2 = salary;
  if (salary2 > debt) {
    alert("you pay to much");
    console.log("debt" + debt);
    console.log("salary" + salary);
  } else {
    loanPayment(salary2);
    paySalary(salary2);
    console.log("debt" + debt);
    console.log("salary" + salary);
  }
};

payLoanButtonElement.addEventListener("click", handlePayLoanButton);

const handlePayButton = (e) => {
  if (balance >= laptopPriceElement.innerHTML) {
    console.log("balance before:" + balance);
    withdraw(laptopPriceElement.innerHTML);
    console.log("balance after" + balance);
    console.log(laptopPriceElement.innerHTML);
  } else {
    alert("You can't afford this computer");
  }
};

payLaptopElement.addEventListener("click", handlePayButton);
