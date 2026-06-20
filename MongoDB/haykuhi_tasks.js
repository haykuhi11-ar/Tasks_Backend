// ====== Task 3.1 — Insert one todo ======

db.todos.insertOne({
    title: "Buy groceries",
    done: false,
    priority: "medium",
    created_at: new Date()
})
print("Inserted one todo.")


// ====== Task 3.2 — Insert many todos at once ======

db.todos.insertMany([
    {
    title: "Finish homework",
    done: false,
    priority: "high",
    created_at: new Date()
  },
  {
    title: "Clean room",
    done: true,
    priority: "low",
    created_at: new Date()
  },
  {
    title: "Read book",
    done: false,
    priority: "medium",
    created_at: new Date(),
    due_date: new Date("2026-06-25")
  }
])
print("Inserted many todos.")


// ====== Task 3.3 — Insert a todo with tags ======

db.todos.insertOne({
    title: "Prepare project",
    done: false,
    priority: "high",
    tags: ["work", "urgent"]
})

db.todos.insertOne({
    title: "Organize files",
    done: false,
    priority: "medium",
    tags: ["home", "cleanup", "productivity"]
})

print("Inserted todos tags.")


// ====== Task 3.4 — Insert with embedded subtasks ======

db.todos.insertOne({
    title: "Build mini app",
    done: false,
    priority: "high",
    subtasks: [
        { title: "Open laptop", done: true },
        { title: "Setup project", done: true },
        { title: "Write code", done: false }
    ]
})

print("Inserted todo with subtasks.")


// ====== Task 3.5 — Test the unique constraint ======

try {
    db.todos.insertOne({
        title: "Buy groceries",   // dublicate
        done: false,
        priority: "low"
    })
    
} catch (error) {
    print("Unique constraint error:")
    print(error.message)
}

// ====== Task 3.6 — Count documents ======

print("total todos: ", db.todos.countDocuments())


// ====== Task 4.1 — Find all todos =====

db.todos.find().pretty()


// ====== Task 4.2 — Find by exact match ======

db.todos.find({ done: false })
db.todos.find({ priority: "high"})


// ====== Task 4.3 — Multiple conditions ======

db.todos.find({
    done: false,
    priority: "high"
})


// ====== Task 4.4 — Comparison operators ======

db.todos.find({
    due_date: {
        $lt: new Date()
    }
})

db.todos.find({
    priority: {
        $in: ["high", "medium"]
    }
})


// ====== Task 4.5 — Search with regex ======

db.todos.find({
    title: {
        $regex: "buy",
        $options: "i"
    }
})

// ====== Task 4.6 — Find by array element ======

db.todos.find({
    tags: "work"
})

db.todos.find({
    tags: {
        $all: ["work", "urgent"]
    }
})

// ====== Task 4.7 — Field exists ======

db.todos.find({
    due_date: {
        $exists: true
    }
})

db.todos.find({
    subtasks: {
        $exists: false
    }
})


// ====== Task 4.8 — Sort and limit ======

db.todos.find({
    priority: "high"
}).sort({ created_at: -1 }).limit(3)


// ====== Task 4.9 — Projection ======

db.todos.find({}, {
    title: 1,
    priority: 1,
    _id: 0
})


// ======= Task 4.10 — Pagination ======

db.todos.find().skip(3).limit(3)


// ====== Task 5.1 — Update one document ======

db.todos.updateOne(
    { title: "Buy groceries" },
    {
        $set: {
            done: true
        }
    }
)

db.todos.find({ title: "Buy groceries" })

// ====== Task 5.2 — Update many documents ======

const result = db.todos.updateMany(
    { priority: "high" },
    {
        $set: {
            done: true
        }
    }
)

print(result.modifiedCount)

// ====== Task 5.3 — Add a new field to existing documents ======

db.todos.updateMany({}, {
    $set: {
        updated_at: new Date()
    }
})

// ====== Task 5.4 — Remove a field ====== 

db.todos.updateOne(
    { title: "buy groceries" },
    {
        $unset: {
            due_date: ""
        }
    }
)

// ====== Task 5.5 — Add an item to an array ======

db.todos.updateOne(
    { title: "Buy groceries" },
    {
        $addToSet: {
            tags: "important"
        }
    }
)

// ====== Task 5.6 — Remove an item from an array ======

db.todos.updateMany(
    { tags: "urgent" },
    {
        $pull: {
            tags: "urgent"
        }
    }
)


// ====== Task 5.7 — Increment a number ======

db.todos.updateMany(
    {},
    {
        $set: {
            attempts: 0
        }
    }
)

db.todos.updateOne(
    {
        title: "Buy groceries"
    },
    {
        $inc: { attempts: 1 }
    }
)

// ====== Task 5.8 — Upsert ======

db.todos.updateOne(
    { title: "Weekly review" },
    {
        $set: {
            done: false,
            priority: "medium",
            updated_at: new Date()
        }
    },
    {
        $upsert: true
    }
)


// ====== Task 6.1 — Find todos with at least one subtask ======

db.todos.find({
    subtasks: {
        $exists: true,
        $not: {
            $size: 0
        }
    }
})


// ====== Task 6.2 — Find todos where ALL subtasks are done ======

db.todos.find({
    subtasks: {
        $not: {
            $elemMatch: { done: false }
        }
    }
})

// ====== Task 6.3 — Add a new subtask to a specific todo ======

db.todos.updateOne(
    { title: "Prepare project" },
    {
        $push: {
            subtasks: {
                title: "Send project",
                done: false
            }
        }
    }
)


// ====== Task 6.4 — Mark a specific subtask as done ======

db.todos.updateOne(
    {
        title: "Prepare project",
        "subtasks.title": "Send project"
    },
    {
        $set: {
            "subtasks.$.done": true
        }
    }
)

// ====== Task 6.5 — Count todos with more than 2 subtasks ======

db.todos.countDocuments({
    "subtasks.2": {
        $exists: true
    }
})


// ===== Task 7.1 — Delete one todo ======

db.todos.deleteOne({
    title: "Weekly review"
})

// ====== Task 7.2 — Delete many todos ======

const res = db.todos.deleteMany({
    done: true
})
print(res.deletedCount)

// ====== Task 7.3 — Delete by date range ======

const someDate = new Date("2026-06-20")

db.todos.deleteMany({
    created_at: {
        $lt: someDate
    }
})

// ====== Task 7.4 — DON'T delete everything ======

// db.todos.deleteMany({})
// WARNING: This will remove every todo from the collection and cannot be undone.

// db.todos.drop()
// Extremely dangerous: removes the entire todos collection, including its indexes.


// ====== Task 8.1 — Count todos by priority ======

db.todos.aggregate([
    {
        $group: {
            _id: "$priority",
            count: { $sum: 1 }
        }
    }
])

// ====== Task 8.2 — Count todos by done status ======

db.todos.aggregate([
    {
        $group: {
            _id: "$done",
            count: { $sum: 1 }
        }
    }
])


// ====== Task 8.3 — Tag usage statistics ======

db.todos.aggregate([
    {
        $unwind: "$tags"
    },
    {
        $group: {
            _id: "$tags",
            count: {
                $sum: 1
            }
        }
    }
])

// ====== Task 8.4 — Todos per day ======

db.todos.aggregate([
    {
        $group: {
            _id: {
                $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$created_at"
                }
            },
            count: {
                $sum: 1 
            }
        }
    },
    {
        $sort: {
            _id: 1
        }
    }
])


// ====== Task 8.5 — Show only titles of unfinished high-priority todos, sorted ======

db.todos.aggregate([
    {
        $match: {
            done: false,
            priority: "high"
        }
    },
    {
        $project: {
            _id: 0,
            title: 1
        }
    },
    {
        $sort: {
            title: 1
        }
    }
])

// ====== Task 9.1 — Reconnect as todo_viewer ====== 

// mongosh "mongodb://todo_viewer:viewer123@localhost:27017/todoapp"
// db.todos.find()

// db.todos.insertOne({ title: "test" })
// MongoServerError[Unauthorized]: not authorized on todoapp to execute command { insert: "todos" }

// db.todos.deleteOne({ title: "test" })
// MongoServerError: not authorized on todoapp to execute command { delete: "todos" }

// -----------------------------------------------------------------------------------------

// ====== Task 9.2 — Change a user's password ====== 

// Reconnect as admin
// mongosh "mongodb://haykuhi:haykuhi11-ar@localhost:27017/admin"

// use todoapp
// db.changeUserPassword('todo_viewer', 'newViewerPass')

// Verify with new password
// mongosh "mongodb://todo_viewer:newViewerPass@localhost:27017/todoapp"

// ====== Task 9.3 — Grant additional role ====== 

// Reconnect as admin
// use todoapp
// db.grantRolesToUser('todo_viewer', [{ role: 'readWrite', db: 'todoapp' }])

// ====== Task 9.4 — Drop the viewer ====== 

// use todoapp
// db.dropUser('todo_viewer')

// Verify user no longer exists
// db.getUsers()

print("All tasks done")

// ===== Task 10.1 — Drop the collection ======

// Reconnect as admin
// mongosh "mongodb://haykuhi:haykuhi11-ar@localhost:27017/admin"

// use todoapp
// db.todos.drop()

// ====== Task 10.2 — Drop the database ====== 
 
// db.dropDatabase()