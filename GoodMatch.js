const logger = require('./logger');
//This fuction count the number of character in the name1 and name2
function CountChar(name1, name2){
    let charRepetetionNumber = "";
    let matchesNames = name1.toLowerCase().trim() + "matches" + name2.toLowerCase().trim();
   
    while(matchesNames !== ""){
        let CountCharNumber = 0;
        let currentCheckedChar = matchesNames.charAt(0);
        for (let i = 0; i < matchesNames.length; i++) {
            if( currentCheckedChar === matchesNames[i]){
                CountCharNumber++;
                matchesNames = matchesNames.replace(matchesNames[i],'')
                --i;
            }
        }
        charRepetetionNumber += CountCharNumber;
    }
     
    return charRepetetionNumber;
}

//This function reduce the number into two digits that was obtain from the above function     
function ReduceNumberTwoDigit(charRepetetionNumber){

    while(charRepetetionNumber.length != 2){
        let newStrNumber = "";
        let temp = charRepetetionNumber;
        while(temp !== ""){
            if(temp.length===1){
                newStrNumber += temp.charAt(0);
                temp = temp.replace(temp.charAt(0),'');
            }
            else{
                let sum = parseInt(temp.charAt(0)) + parseInt(temp.charAt(temp.length-1));
                newStrNumber += sum;
                temp = temp.substring(1,temp.length-1);
            }
        }
        charRepetetionNumber = newStrNumber;
    }
    return charRepetetionNumber;
}

//Section 1 (program accepts two strings and calculates the match percentage)

//Using while loop to iterate on male Array(SET) to match with female array(SET)
function FindGoodMatch(setArr1, setArr2){
    let finalResults = [];
    let cnt = 0;
    while(cnt != setArr1.length){
        let name1 = setArr1[cnt];
        let name2 = "";
        if(!/[^A-Za-z]/.test(name1)){
            for (let i = 0; i < setArr2.length; i++){
                name2 = setArr2[i];
                if(!/[^a-zA-Z]/.test(name2)){
                    let charRepetetionNumber = CountChar(name1,name2);
                    let lastTwoDigits =parseInt(ReduceNumberTwoDigit(charRepetetionNumber));
                    if(lastTwoDigits>80){
                        finalResults.push(name1 + " matches " + name2  + ", " + lastTwoDigits + "%, good match");
                    }
                    else{
                    finalResults.push(name1 + " matches " + name2  + ", " + lastTwoDigits + "%");
                    }
                }
                else{
                    logger.info(name2 + " cannot be matched with " + name1 + " because is badly formmated. The name should only contain letters.")
                }
            }   
        }
        else{
            logger.info(name1 + " is badly formmated. The name should only contain letters.")
        }
        ++cnt;
    }
    //Sorting the data according alphabetically.
    finalResults.sort();

    //Sorting the data according percent (descending).
    finalResults.sort((a, b) => {
        let arr = a.split(", ");
        let arr2 = b.split(", ");
        if ( (arr[1] > arr2[1]) )
            return -1;
        if ((arr[1] < arr2[1]))
            return 1;
        return 0;
    });

    return finalResults;
}

//Write the output to the file.
function WriteResultOnFile(fileName,finalResults){
    const fs = require('fs')
    fs.writeFile(fileName,'', function (err) {if (err) throw err;});
    for(let i in finalResults){
        fs.appendFile(fileName, finalResults[i].replace(",",'') +"\n", function (err) {
            if (err) throw err;
        });
    }
}

// main fuction

//Section 2 (program accept a CSV file as input)
let maleArr = [];
let femaleArr = [];
let dataFromCSV = require("fs").readFileSync("InputFile.csv", "utf8");
dataFromCSV = dataFromCSV.split("\r\n");

for (let row in dataFromCSV){
    let tempArr = dataFromCSV[row].split(", ");
    let personName = tempArr[0];
    let genderType = tempArr[1];

    if( genderType === 'm' && !maleArr.includes(personName)){
        maleArr.push(personName);
    }
    else if(genderType === 'f' && !femaleArr.includes(personName)){
        femaleArr.push(personName);
    }
}
logger.info("Normal Output result");
let start = new Date().getTime();
let finalResults = FindGoodMatch(maleArr, femaleArr);
//Write the output to the file called "output.txt"
let fileName = "output.txt";
WriteResultOnFile(fileName,finalResults);
let end = new Date().getTime();
logger.info("Result printed on output.txt file");
logger.info("Time of excution: Started - "+ start +" Ended-"+ end);
logger.info("Time of completion: "+(end-start) + "ms");

//Section 3 Optional

//Number 2
//Printing the result reverse (Female SET matche with Male SET) and print result on text file
logger.info("Reverse output result");
start = new Date().getTime();
finalResults = FindGoodMatch(femaleArr, maleArr);
//Write the output to the file called "ReverseOutput.txt"
fileName2 = "ReverseOutput.txt";
WriteResultOnFile(fileName2,finalResults);
end = new Date().getTime();
logger.info("Result printed on ReverseOutput.txt file");
logger.info("Time of excution: Started - "+ start +" Ended-"+ end);
logger.info("Time of completion: "+(end-start) + "ms");
console.log("Data was succefully captured in file output.txt and ReverseOutput.txt");



