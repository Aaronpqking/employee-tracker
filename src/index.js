const mysql = require("mysql2");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    port: 3306,
    database: "employees_db"
});

connection.connect(() => {
    console.log("CONNECTED....HEAVILY");
    start();
});

function start() {
    inquirer.prompt([
      {
        name: "prompt",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee roles",
          
          "Exit"
        ]
      }])
      .then(function (response) {
        switch (response.prompt) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "Add a new department":
            addDepartment();
            break;
          case "Add a new role":
            addRole();
            break;
          case "Add a new employee":
            addEmployee();
            break;
         
          case "Update employee roles":
            updateEmp();
            break;
          case "exit":
            connection.end();
            break;
        }
      });
};
  
function viewDepartments()
{
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.log("ya messed up");
        };
        console.table(res);
        start();
    }
    )
}
{
  connection.query("SELECT * FROM roles", (err, res) => {
      if (err) {
          console.log("ya messed up");
      };
      console.table(res);
      start();
  }
  )
}
{
  connection.query("SELECT * FROM employees", (err, res) => {
      if (err) {
          console.log("ya messed up");
      };
      console.table(res);
      start();
  }
  )
}