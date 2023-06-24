const fs = require("fs");
const path = require("path");

const getUniqueValue = (file) => {
    const dirPath = path.join(__dirname, file);
    const data = fs.readFileSync(dirPath, 'utf-8').split(" ");
    const cleanDataInArray = data.filter(item => item !== "");
    const uniqueSymbolInEachWord = cleanDataInArray.map(el => [...el].find((element, _, array) => array.indexOf(element) === array.lastIndexOf(element)))
    const result = uniqueSymbolInEachWord.find((element, _, array) => array.indexOf(element) === array.lastIndexOf(element));
    if (!result) { 
        console.log("The unique symbol is absent in this file");
    }
}

getUniqueValue("data.txt");