<template>
  <div class="todo-container">
    <form @submit.prevent="addNewTodo">
      <TextForm v-model="todoText" id="todoText" placeholder="Add new todo" />
      <Button type="submit" text="Add" />
    </form>
    <div v-if="todoList && todoList.length > 0" class="todo-list">
      <div
        v-for="(todo, todoIndex) in todoList"
        :key="todoIndex"
        class="todo"
        :class="{ done: todo.isDone }"
      >
        <span class="todo-text">
          {{ todo.text }}
        </span>
        <Button
          :text="todo.isDone ? 'Todo' : 'Done'"
          @click="updateTodo(todo, todoIndex)"
        />
        <Button text="Delete" @click="deleteTodo(todo._id, todoIndex)" />
      </div>
    </div>
    <div v-else class="no-todos">
      No todos added yet
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TextForm from "~/components/commons/TextForm";
import Button from "~/components/commons/Button";

export default {
  components: {
    TextForm,
    Button
  },
  data() {
    return {
      todoText: null,
      todoList: null
    };
  },
  computed: {
    ...mapState("user", {
      userId: state => state.userId
    })
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    getTodos() {
      this.$axios.$get("/todos/").then(res => {
        this.todoList = res.todos;
      });
    },
    addNewTodo() {
      this.$axios
        .$post("/todos/", {
          text: this.todoText,
          userId: this.userId
        })
        .then(res => {
          if (this.todoList) {
            this.todoList.push(res.todo);
          } else {
            this.todoList = [res.todo];
          }
          this.todoText = null;
        });
    },
    deleteTodo(todoId, todoIndex) {
      this.$axios
        .$post("/todos/delete", {
          todoId: todoId
        })
        .then(() => {
          this.todoList.splice(todoIndex, 1);
        });
    },
    updateTodo(todo, todoIndex) {
      todo.isDone = !todo.isDone;
      this.$axios
        .$put("/todos/", {
          todoId: todo._id,
          text: todo.text,
          isDone: todo.isDone
        })
        .then(() => {
          this.todoList[todoIndex].text = todo.text;
          this.todoList[todoIndex].isDone = todo.isDone;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-container {
  max-width: 500px;
  margin: 0 auto;
}
form {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.no-todos {
  padding: 64px;
  text-align: center;
}
.todo-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column-reverse;
}
.todo {
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &.done {
    opacity: 0.6;
  }

  .todo-text {
    flex-grow: 1;
    font-size: 24px;
    border: solid 2px white;
    padding: 8px 16px;
  }
}
</style>
