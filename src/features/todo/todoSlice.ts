import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Todo {
  id: number
  name: string
  content: string
  created: string
  category: "Task" | "Idea" | "Quote" | "Random Thought"
  dates: Array<string> | undefined
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
  items: [
    {
      id: 254,
      name: "Shop",
      content: "Buy groceries",
      created: "7/28/2023",
      category: "Task",
      dates: ["7/30/2023", "8/5/2023"],
      archived: false,
    },
  ],
  summary: [],
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
} = todoSlice.actions
export default todoSlice.reducer
