const balanceElement = document.getElementById("balance");
const debtElement = document.getElementById("debt");
const salaryElement = document.getElementById("salary");
const debtTextElement = document.getElementById("debtText");

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
    debtElement.style.display = "none";
    debtTextElement.style.display = "none";
    payLoanButtonElement.style.display = "none";
  }
  else {
    debtElement.style.display = "block"
    debtTextElement.style.display = "block";
    payLoanButtonElement.style.display = "block";
  }
}

const deposit = (amount) => {
  balance += amount;
};
const earn = (amount) => {
  salary += amount;
};
const withdraw = (amount) => {
  balance -= amount;
};
const paySalary = (amount) => {
  salary -= amount;
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
  hideOrShowLoanElements(debt);
};
const loanPayment = (amount) => {
  debt -= amount;
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
