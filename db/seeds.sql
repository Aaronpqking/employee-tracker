use employees_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('HR'),
    ('Entertainment'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3);
 

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);