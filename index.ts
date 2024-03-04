
import inquirer from "inquirer";
const answers =await inquirer.prompt([
{
    type:"number",
    name:"numone",
    message: "kindly inter your first number",

}, 
{type:"number",
    name:"numtwo",
     message: "kindly inter your second number",

},
{
    type: "list",
    name:"opperator",
    choices: ['addition','subtraction','multiplication',"division"],
    message:"Sellect your opperator:"
}
]) 
 if (answers.opperator ==="addition") {
    console.log(answers.numone + answers.numtwo)   
}
if (answers.opperator ==="subtraction") {
    console.log(answers.numone - answers.numtwo)  
}
if (answers.opperator ==="multiplication") {
    console.log(answers.numone * answers.numtwo)
}
if (answers.opperator ==="division") {
            console.log(answers.numone / answers.numtwo)   
    }