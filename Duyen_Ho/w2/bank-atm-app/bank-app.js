console.log('app works');

// balances
var balanceSav = document.getElementsByTagName('span')[0];
var balanceCheq = document.getElementsByTagName('span')[0];

// inputs
var inputSav = document.getElementsByTagName('input')[0];
var inputCheq = document.getElementsByTagName('input')[0];

var add = function(num1, num2) {
  return num1 + num2;
};

var subtract = function(num1, num2) {
  return num1 - num2;
}

var prepCurrency = function(input) {
  var num = 0;
  if (input === balanceSav || input === balanceCheq){
    var num = parseFloat(input.innerHTML).toFixed(2)/1;
  } else {
    var num = parseFloat(input.value).toFixed(2)/1;
  }
  return num;
}

// toFixed two decimal places - returns a string
// divide by 1 to convert back to number - is this acceptable?
// doubling up on conversion - is there a better way?

var depositSav = function() {
  var bal = prepCurrency(balanceSav);
  var amount = prepCurrency(inputSav);
  balanceSav.innerHTML = add(bal, amount);
}

// not working
var depositCheq = function() {
  var bal = prepCurrency(balanceCheq);
  var amount = prepCurrency(inputCheq);
  balanceCheq.innerHTML = add(bal, amount);
}

// not working
var withdrawSav = function() {
  var bal = prepCurrency(balanceSav);
  var amount = prepCurrency(withdrawSav);
  balanceSav.innerHTML = subtract(bal, amount);
}

// not working
var withdrawCheq = function() {
  var bal = prepCurrency(balanceCheq);
  var amount = prepCurrency(withdrawCheq);
  balanceCheq.innerHTML = subtract(bal, amount);
}

// get it to work, then:
// refactor above into one deposit and withdraw function with one parameter
// pass in savings or cheque as arguments
// syntax:
      // btnDepositSav.addEventListener('click', function(){
      //   deposit(button);
      // });

// btn events
var btnDepositSav = document.getElementById('btn-deposit-sav');
btnDepositSav.addEventListener('click', depositSav);

var btnDepositCheq = document.getElementById('btn-deposit-cheq');
btnDepositCheq.addEventListener('click', depositCheq);

var btnWithdrawSav = document.getElementById('btn-withdraw-sav');
btnWithdrawSav.addEventListener('click', withdrawSav);

var btnWithdrawCheq = document.getElementById('btn-withdraw-cheq');
btnWithdrawCheq.addEventListener('click', withdrawCheq);



// change input fields to two decimals - rewrite prepCurrency()





/*
### Specification:

* Keep track of the checking and savings balances somewhere
* Add functionality so that a user can deposit money into one of the bank accounts.
* Make sure you are updating the display and manipulating the HTML of the page
so a user can see the change.
* Add functionality so that a user can withdraw money from one of the bank accounts.
* Make sure you are updating the display and manipulating the HTML of the page
so a user can see the change.
* Make sure the balance in an account can't go negative. If a user tries to
withdraw more money than exists in the account, ignore the transaction.
* When the balance of the bank account is $0 the background of that bank account
should be red. It should be gray when there is money in the account
* What happens when the user wants to withdraw more money from the checking
account than is in the account? These accounts have overdraft protection, so if
a withdrawal can be covered by the balances in both accounts, take the checking
balance down to $0 and take the rest of the withdrawal from the savings account.
If the withdrawal amount is more than the combined account balance, ignore it.
* Make sure there is overdraft protection going both ways.
* Are there ways to refactor your code to make it DRYer
*/
