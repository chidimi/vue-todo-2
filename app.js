const STORAGE_KEY = "todos-vue-demo";
const todoStorage = {
  fetch: function () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach((todo, index) => {
      todo.id = index + 1;
    });
    todoStorage.uid = todos.length + 1;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

const app = Vue.createApp({
  data() {
    return {
      editingTodo: "",
      todos: [],
      content: "",
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
    removeAll() {
      this.todos = [];
    },
    addTodo() {
      const todo = { id: todoStorage.uid++, content: this.content };
      this.todos.push(todo);
      this.content = "";
    },
    editTodo() {
      this.hideEditingTodoFields();
    },
    showEditingTodoFields(todo) {
      this.editingTodo = todo;
      this.$nextTick(() => {
        this.$refs.editingTodoContent.select();
      });
    },
    hideEditingTodoFields() {
      this.editingTodo = undefined;
    },
    isEditingTodo(todo) {
      return this.editingTodo !== undefined && this.editingTodo.id === todo.id;
    },
  },
});

app.mount("#app");
