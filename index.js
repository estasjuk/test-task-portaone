const fs = require("fs");
const path = require("path");
const perf_hooks = require('perf_hooks');

const performanseObserver = new perf_hooks.PerformanceObserver((items, observer) => {
    const entry = items.getEntriesByName('getUniqueValue').pop();
    console.log(`Execution time: ${entry.duration} ms`);
    observer.disconnect();
});
performanseObserver.observe({ entryTypes: ['measure', 'function'] });

let getUniqueValue = (file) => {
    const dirPath = path.join(__dirname, file);
    const data = fs.readFileSync(dirPath, 'utf-8').split(" ");
    const cleanDataInArray = data.filter(item => item !== "");
    const uniqueSymbolInEachWord = cleanDataInArray.map(el => [...el].find((element, _, array) => array.indexOf(element) === array.lastIndexOf(element)))
    const result = uniqueSymbolInEachWord.find((element, _, array) => array.indexOf(element) === array.lastIndexOf(element));
    if (!result) {
        console.log("The unique symbol is absent in this file");
    } else console.log(result);
};

getUniqueValue = perf_hooks.performance.timerify(getUniqueValue);
getUniqueValue("data.txt");