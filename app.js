var STORAGE_KEY = "todos-vue-demo";
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function (todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

const app = Vue.createApp({
  data() {
    return {
      todos: [],
    };
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos);
      },
      deep: true,
    },
  },
  created() {
    this.todos = todoStorage.fetch();
  },
  methods: {
    removeTodo(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    addTodo() {
      const todo = { id: todoStorage.uid++, content: this.content };
      this.todos.push(todo);
      this.content = "";
    },
    editTodo() {},
    doEdit() {
      this.edit = true;
    },
  },
});

app.mount("#app");
