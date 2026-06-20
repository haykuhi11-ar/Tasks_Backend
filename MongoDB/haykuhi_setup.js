// ===== Task 1.1 — Create the database ======

use("todoapp")
print("Task 1.1: switched to todoapp database")



// ===== Task 1.2 — Create an application user ======

if (!db.getUser("todo_app")) {
    db.createUser({
        user: "todo_app",
        pwd: "haykuhi123",
        roles: [{ role: "readWrite", db: "todoapp" }]
    })
}
    
print("Task 1.2: user todo_app created")



// ===== Task 1.3 — Create a read-only user ======

if (!db.getUser("todo_viewer")) {
    db.createUser({
        user: "todo_viewer",
        pwd: "viewer123",
        roles: [{ role: "read", db: "todoapp" }]
    })
}

print("Task 1.3: user todo_viewer created")



// ===== Task 1.4 — Verify your users ======

print("Task 1.4: list of users:")
printjson(db.getUsers())

// Task 1.4: list of users:
// {
//   users: [
//     {
//       _id: 'todoapp.todo_app',
//       userId: UUID('9501c7b8-f0a5-4614-8d0f-f8b7ea01b380'),
//       user: 'todo_app',
//       db: 'todoapp',
//       roles: [
//         {
//           role: 'readWrite',
//           db: 'todoapp'
//         }
//       ],
//       mechanisms: [
//         'SCRAM-SHA-1',
//         'SCRAM-SHA-256'
//       ]
//     },
//     {
//       _id: 'todoapp.todo_viewer',
//       userId: UUID('0c61f094-3e8a-4ccd-8e15-20ca10ba2520'),
//       user: 'todo_viewer',
//       db: 'todoapp',
//       roles: [
//         {
//           role: 'read',
//           db: 'todoapp'
//         }
//       ],
//       mechanisms: [
//         'SCRAM-SHA-1',
//         'SCRAM-SHA-256'
//       ]
//     }
//   ],
//   ok: 1
// }


// ===== Task 1.5 — Test the connection ======== 

// Connected as todo_app — read and write works successfully
// Connected as todo_viewer — expected write error but authentication
// is not enabled on this MongoDB instance, so access control
// is not enforced. todo_viewer could write without restriction.
// To enable auth: set security.authorization: enabled in /etc/mongod.conf



// ======  Task 2.1 — Create the todos collection ======

db.createCollection("todos")
print("Collection created.")


// ====== Task 2.2 — Add an index ====== 

db.todos.createIndex(
    { title: 1 },
    { unique: true }
)
print("unique index on title created.")

// Titles must be unique in the application to prevent duplicate tasks


// ====== Task 2.3 — Add a compound index ====== 

db.todos.createIndex(
    { done: 1, priority: 1 }
)
print("Compound index created.")


// ====== Task 2.4 — List all indexes ====== 

print("All indexes:")
printjson(db.todos.getIndexes())