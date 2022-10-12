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
};
function viewRoles()
{
  connection.query("SELECT * FROM role", (err, res) => {
    
      if (err) {
          console.log("ya messed up");
      };
      console.table(res);
      start();
  }
  )
};
function viewEmployees()
{
  connection.query("SELECT * FROM employee", (err, res) => {
      if (err) {
          console.log("ya messed up");
      };
      console.table(res);
      start();
  }
  )
};
function addDepartment() {
  inquirer.prompt([
    {
      name: "departmentName",
      type: 'input',
      message: 'What is the name of the department?',
    }])
    .then(function (response) {
connection.query("INSERT INTO department SET ?",
        {
          name: response.departmentName
        },
        function (err, res) {
          if (err) throw err;
          console.log("department added");
          start();
        }
      );
    });
    };

function addRole() {
  connection.query("SELECT * FROM Department", function (err, res) {
    if (err) throw err;
      
    inquirer.prompt([
      {
        name: "title",
        type: 'input',
        message: 'What is the title of the new role?',
      },
      {
        name: "salary",
        type: 'input',
        message: "What is the salary of the new role?"
      },
      {
        name: "deptID",
        type: "list",
        message: "select a department for this role",
        choices: res.map(department => department.name)
      },
    ])
      .then(function (response) {
        const chosenDept = res.find(dept => dept.name === response.deptID);
        connection.query("INSERT INTO role SET ?",
          {
            title: response.title,
            salary: response.salary,
            department_id: chosenDept.id
          },
          function (err, res) {
            if (err) throw err;
            console.log("role added");
            start();
          }
        );
      })
  })


}

function addEmployee() {
  connection.query("SELECT * FROM Role", function (err, res) {
    if (err) throw err;

    connection.query("SELECT * FROM employee", function (err2, res2) {
      if (err2) throw err;

      inquirer.prompt([
        {
          name: "firstName",
          type: 'input',
          message: "What's the new employee's first name?",
        },
        {
          name: "lastName",
          type: 'input',
          message: "What is the new employee's last name?"
        },
        {
          name: "roleID",
          type: "list",
          message: "select a department for this role",
          choices: res.map(role => role.title)
        },
        {
          name: "managerID",
          type: "list",
          message: "Select the new employee's manager",
          choices: res2.map(employee => employee.last_name + ", " + employee.first_name)
        }
      ])
        .then(function (response) {
          const chosenDept = res.find(role => role.title === response.roleID);
          const chosenEmp = res2.find(employee => employee.last_name + ", " + employee.first_name === response.managerID);

          connection.query("INSERT INTO employee SET ?",
            {
              first_name: response.firstName,
              last_name: response.lastName,
              role_id: chosenDept.id,
              manager_id: chosenEmp.id
            },
            function (err3, res3) {
              if (err3) throw err;
              // console.log("Employee added");
              connection.query("SELECT * FROM employee", (err, res) => {
                if (err) {
                  console.log("try again");
                };
                console.table(res);
                start();

              })
            });
        })
    })
  })
}
function updateEmp() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
  
    inquirer.prompt([
      {
        name: "updateEmp",
        type: 'list',
        message: "Which employee would you like to update?",
        choices: res.map(employee => employee.last_name + ", " + employee.first_name)

      },
    ])
      .then(function (response) {
        const chosenEmp = res.find(employee => employee.first_name + ", " + employee.last_name === response.employeeID);
        inquirer.prompt([
          {
            name: "firstName",
            type: 'input',
            message: "Re-enter the employee's first name?",
          },
          {
            name: "lastName",
            type: 'input',
            message: "Re-enter the employee's last name?"
          },
          {
            name: "roleID",
            type: "list",
            message: "Reselect a department for this role",
            choices: res.map(role => role.title)
          },
          {
            name: "managerID",
            type: "list",
            message: "Select the employee's manager",
            choices: res.map(employee => employee.last_name + ", " + employee.first_name)
          }
        ])
          .then(function (response) {
            const chosenDept = res2.find(role => role.title === response.roleID);
            const chosenMan = res2.find(employee => employee.last_name + ", " + employee.first_name === response.managerID);
      
                
            connection.query("UPDATE employee SET ? WHERE ID  ",
              {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: chosenDept.id,
                manager_id: chosenMan.id
              },
              function (err2, res2) {
                if (err2) throw err;
                // console.log("Employee added");
                //  connection.query("SELECT * FROM employee", (err, res) => {
                //   if (err) {
                //     console.log("ya messed up");
                //   };
                //    console.table(res);
                start();
  
              })
          });
      })
  }
   ) } 
   
