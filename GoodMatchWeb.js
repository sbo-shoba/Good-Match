
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

function FindGoodMatch(name1, name2){
    if(!/[^a-zA-Z]/.test(name1) ){
        if(!/[^a-zA-Z]/.test(name2)){
            let charRepetetionNumber = CountChar(name1,name2);
            let lastTwoDigits =parseInt(ReduceNumberTwoDigit(charRepetetionNumber));
            if(lastTwoDigits>80){
                finalResults = (name1 + " matches " + name2  + ", " + lastTwoDigits + "%, good match");
            }
            else{
            finalResults = (name1 + " matches " + name2  + ", " + lastTwoDigits + "%");
            }
        }
        else{
            return (name2 + " cannot be matched with " + name1 + " because is badly formmated. The name should only contain letters.")
        }
    }
    else{
        return (name1 + " because is badly formmated. The name should only contain letters.")
    }   
    return finalResults;
}


//Number 3

document.getElementById("matchButton").onclick = function(){
    
    let start = new Date().getTime();
    let firstName = document.getElementById("myName").value;
    let secondName = document.getElementById("matchPerson").value;
    let result = FindGoodMatch(firstName, secondName);
    document.getElementById('resultId').innerHTML = "Result: " + result;
    
}
