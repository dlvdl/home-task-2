import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { notes, summary } from "../../mockData/data.ts"

export interface Todo {
  id: number
  name: string
  content: string
  created: string
  category: "Task" | "Idea" | "Quote" | "Random Thought"
  dates: Array<string> | undefined
  archived: boolean
}

export interface Summary {
  category: "Task" | "Idea" | "Quote" | "Random Thought"
  active: number
  archived: number
}

interface TodoState {
  items: Array<Todo>
  summary: Array<Summary>
  createMenuOpened: boolean
  archiveTableOpened: boolean
  editMenuOpened: boolean
  selectedTodoId: number | null
}

interface EditedData {
  id: number
  name: string
  category: "Task" | "Idea" | "Quote" | "Random Thought"
  content: string
  dates: Array<string>
}

const initialState: TodoState = {
  items: notes as Array<Todo>,
  summary: summary as Array<Summary>,
  createMenuOpened: false,
  archiveTableOpened: false,
  editMenuOpened: false,
  selectedTodoId: null,
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items = [...state.items, action.payload]
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    editTodo: (state, action: PayloadAction<EditedData>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          const { name, category, content, dates } = action.payload
          item = { ...item, name, category, content, dates }
        }
        return item
      })
    },

    changeState: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) item.archived = !item.archived
        return item
      })
    },

    openCreateMenu: (state) => {
      state.createMenuOpened = !state.createMenuOpened
    },

    openArchiveTable: (state) => {
      state.archiveTableOpened = !state.archiveTableOpened
    },

    openEditMenu: (state) => {
      state.editMenuOpened = !state.editMenuOpened
    },

    setSelectedTodo: (state, action: PayloadAction<number>) => {
      state.selectedTodoId = action.payload
    },

    unsetSelectedTodo: (state) => {
      state.selectedTodoId = null
    },

    refreshSummary: (state) => {
      const counts: Array<Summary> = []

      for (const todo of state.items) {
        const category = todo.category
        const known = counts.findIndex((c) => c.category === category)

        if (known == -1) {
          if (todo.archived) {
            counts.push({ category, active: 0, archived: 1 })
          } else {
            counts.push({ category, active: 1, archived: 0 })
          }
        } else {
          if (todo.archived) {
            counts[known].archived++
          } else {
            counts[known].active++
          }
        }
      }

      state.summary = counts
    },
  },
})

export const {
  addTodo,
  changeState,
  deleteTodo,
  editTodo,
  openCreateMenu,
  openArchiveTable,
  openEditMenu,
  setSelectedTodo,
  unsetSelectedTodo,
  refreshSummary,
} = todoSlice.actions
export default todoSlice.reducer
