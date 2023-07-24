function checkCashRegister(price, cash, cid) {
  let difference = cash - price, 
  change = [["ONE HUNDRED", 0],["TWENTY", 0],["TEN", 0],
  ["FIVE", 0], ["ONE", 0], ["QUARTER", 0], ["DIME", 0],
  ["NICKEL", 0], ["PENNY", 0]], 
  sum = 0; 
  
  const copy = JSON.parse(JSON.stringify(cid)), length = copy.length - 1,
  values = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

  copy.forEach(currency => sum+= currency[1]);

  for (let i = 0; i <= length; i++) {
      while(difference > 0 && copy[length - i][1] > 0 && difference >= values[length - i]) {

        difference-= values[length - i];
        difference = parseFloat(difference).toPrecision(7);
        sum-= values[length - i];
        sum = parseFloat(sum).toPrecision(7);
        copy[length - i][1]-= values[length - i];
        change[i][1]+= values[length - i];
    }
  }
  
  if (sum > 0 && difference == 0) {
    return {status: "OPEN", change: change.filter(currency => currency[1] > 0)} }
  else if (difference > 0) {
    return {status: "INSUFFICIENT_FUNDS", 
  change: []}} 
  else {
      return {status: "CLOSED", 
  change: cid}} 
}