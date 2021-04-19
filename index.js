let randomCostArray = [];
let costsMap = new Map();
let totalDailyValuesMap = new Map();

let totalBudget = 0;

function getCost() {
    // get value of input (date, time and budget)
    // store it in dailyCostArray
    let costValue = parseFloat(document.getElementsByName('costInput')[0].value);
    costValue.toFixed(2);
    const time = document.getElementsByName('timeInput')[0].value;
    const date = document.getElementsByName('dateInput')[0].value;

    const table = document.getElementsByClassName('cost-table')[0];
    table.innerHTML = '';
    randomCostArray = [];

    if(costsMap.get(date)){
        const dayCostArray = costsMap.get(date);
        dayCostArray.push({time, costValue});
        costsMap.set(date, dayCostArray);
    }
    else {
      costsMap.set(date, [{time, costValue}])
    }

    // reset the form values
    // document.getElementsByName('costInput')[0].value='';

    // calculate the new total budget and daily budget
    totalBudget += costValue;
    console.log('total budget ', totalBudget);
    this.generateRandomCostTable();
    // console.log(totalBudget,costArray);
    return false;
}

function generateRandomCostTable() {
    costsMap.forEach((value, key) => {
        this.generateDailyCost(value, key)
    });
    console.log(randomCostArray);
    const tableBody = document.getElementsByClassName('cost-table')[0];
    randomCostArray.forEach(costEntry => {
        const tableRow = document.createElement('tr');
        const dateRowTableCost = document.createElement('td');
        const tableRowDate = document.createElement('td');
        const tableTotalBudget = document.createElement('td');
        dateRowTableCost.innerText = costEntry.cost;
        tableRowDate.innerText = costEntry.date;
        tableTotalBudget.innerText = totalDailyValuesMap.get(costEntry.date)
        tableRow.appendChild(tableRowDate);
        tableRow.appendChild(tableTotalBudget);
        tableRow.appendChild(dateRowTableCost);
        tableBody.appendChild(tableRow);
    });
}

function generateDailyCost(dailyInputs, date) {
    let totalDailyValue = 0;
    let totalDailyCost = 0;
    dailyInputs.forEach(dInput => {
        totalDailyValue += dInput.costValue;
        totalDailyCost += dInput.costValue;
    });
    totalDailyValuesMap.set(date, totalDailyValue);
    for(let i = 0; i < 10; i++) {
        const max = totalDailyValue * 2;
        const genCost = Math.round((Math.random() * max + 1) * 100) / 100;
        if(totalBudget - genCost > 0 && totalDailyCost - genCost > 0){
            totalDailyCost -= genCost;
            randomCostArray.push({date, cost: genCost});
        }
    }
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}