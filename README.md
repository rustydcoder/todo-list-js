# TodoList Boilerplate

Simple and minimal todo-list boilerplate for that can be integrated into any codebase.

## Getting Started

#### HTML

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>To Do List</title>
  </head>
  <body>

      <h1>Todo List</h1>

      <input type="text" id="do" />
      <button id="click">Add</button>
      <div id="list"></div>

    <script src="index.js"></script>
  </body>
</html>
```

**Note**: It is recommended to use an ID because of it's uniqueness.

#### Javascript

```
// The input, the button, and div to be populated
const todo = new Todo('#do', '#click', '#list')
// Call init to initialize todo
todo.init()
```

#### Adding custom emptyState image

`todo.emptyState(path)`
