import { createSlice } from "@reduxjs/toolkit"

interface Todo {
  id: number
  name: string
  content: string
  created: Date
  category: "Task" | "Idea" | "Quote" | "Random Thought"
  dates: string
  archived: boolean
}

interface Summary {
  category: "Task" | "Idea" | "Quote" | "Random Thought"
  active: number
  archived: number
}

interface TodoState {
  items: Array<Todo>
  summary: Array<Summary>
}

const initialState: TodoState = {
  items: [],
  summary: [],
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items = [...state.items, action.payload]
    },

    deleteTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    editTodo: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          const { name, category, content } = action.payload
          item = { ...item, name, category, content }
        }
        return item
      })
    },

    changeState: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) item.archived = !item.archived
        return item
      })
    },
  },
})

export const { addTodo, changeState, deleteTodo, editTodo } = todoSlice.actions
export default todoSlice.reducer
