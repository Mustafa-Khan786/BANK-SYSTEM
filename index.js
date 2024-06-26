import inquirer from "inquirer";
import chalk from "chalk";
import { faker } from "@faker-js/faker";
class customer {
    constructor(fname, lname, age, gender, mobnumber, accnumber) {
        this.firstname = fname;
        this.lastname = lname;
        this.age = age;
        this.gender = gender;
        this.mobnumber = mobnumber;
        this.accnumber = accnumber;
    }
}
class bank {
    constructor() {
        this.customer = [];
        this.account = [];
    }
    addcustomer(obj) {
        this.customer.push(obj);
    }
    addaccontnumber(obj) {
        this.account.push(obj);
    }
    transaction(accobj) {
        let newaccounts = this.account.filter((acc) => acc.accnumber != accobj.accnumber);
        this.account = [...newaccounts, accobj];
    }
}
let myBank = new bank();
//customer create
for (let i = 1; i <= 3; i++) {
    let fname = faker.person.firstName("male");
    let lname = faker.person.lastName("male");
    let num = parseInt(faker.phone.number("3########"));
    const cus = new customer(fname, lname, 25 * i, "male", num, 1000 + i);
    myBank.addcustomer(cus);
    myBank.addaccontnumber({ accnumber: cus.accnumber, balance: 100 * i });
}
async function bankservice(bank) {
    do {
        let service = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "Choose your service",
            choices: ["view balance", "cash withdraw", "cash deposit", "Exit"]
        });
        if (service.select == "view balance") {
            let response = await inquirer.prompt({
                type: "input",
                name: "number",
                message: "please Enter account number"
            });
            let account = myBank.account.find((acc) => acc.accnumber == response.number);
            if (!account) {
                console.log(`${chalk.bold.red("Invalid Account Number")}`);
            }
            if (account) {
                let name = myBank.customer.find((item) => item.accnumber == account?.accnumber);
                console.log(`Dear ${chalk.green.bold(name?.firstname)} ${chalk.green.bold(name?.lastname)} 
           your balance is ${chalk.bold.blue("$ " + account.balance)} `);
            }
        }
        if (service.select == "cash withdraw") {
            let response = await inquirer.prompt({
                type: "input",
                name: "number",
                message: "please Enter account number"
            });
            let account = myBank.account.find((acc) => acc.accnumber == response.number);
            if (!account) {
                console.log(`${chalk.bold.red("Invalid Account Number")}`);
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    message: "Enter your cash",
                    name: "rupee",
                });
                if (ans.rupee > account.balance) {
                    console.log(`${chalk.red.bold("Mojuda Balance Na kafi hai")}`);
                }
                let newbalance = account.balance - ans.rupee;
                bank.transaction({ accnumber: account.accnumber, balance: newbalance });
            }
        }
        if (service.select == "cash deposit") {
            let response = await inquirer.prompt({
                type: "input",
                name: "number",
                message: "please Enter account number"
            });
            let account = myBank.account.find((acc) => acc.accnumber == response.number);
            if (!account) {
                console.log(`${chalk.bold.red("Invalid Account Number")}`);
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    message: "Enter your cash",
                    name: "rupee",
                });
                let newbalance = account.balance + ans.rupee;
                bank.transaction({ accnumber: account.accnumber, balance: newbalance });
            }
        }
        if (service.select == "Exit") {
            process.exit();
        }
    } while (true);
}
bankservice(myBank);
