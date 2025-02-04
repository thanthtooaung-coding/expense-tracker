import React, { useState, useEffect } from "react"
import { Container, Typography, Box, Paper, Tab, Tabs, IconButton, useMediaQuery } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import ExpenseForm from "./components/ExpenseForm"
import { ExpenseList } from "./components/ExpenseList"
import { ExpenseTotal } from "./components/ExpenseTotal"
import { FilterControls, type FilterOptions } from "./components/FilterControls"
import { Dashboard } from "./components/Dashboard"
import { ExportData } from "./components/ExportData"
import type { Expense } from "./model/Expense"
import { Footer } from "./components/Footer"

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses")
    return savedExpenses ? JSON.parse(savedExpenses) : []
  })
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses)
  const [currentTab, setCurrentTab] = useState(0)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  useEffect(() => {
    setDarkMode(prefersDarkMode)
  }, [prefersDarkMode])

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode],
  )

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
    setFilteredExpenses(expenses)
  }, [expenses])

  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }])
  }

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
    setCurrentTab(1) // Switch to the Add/Edit Expense tab
  }

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense)))
    setEditingExpense(null)
  }

  const handleFilterChange = (filter: FilterOptions) => {
    let filtered = expenses

    if (filter.startDate) {
      filtered = filtered.filter((expense) => expense.date >= filter.startDate)
    }
    if (filter.endDate) {
      filtered = filtered.filter((expense) => expense.date <= filter.endDate)
    }
    if (filter.minAmount) {
      filtered = filtered.filter((expense) => expense.amount >= Number.parseFloat(filter.minAmount))
    }
    if (filter.maxAmount) {
      filtered = filtered.filter((expense) => expense.amount <= Number.parseFloat(filter.maxAmount))
    }

    setFilteredExpenses(filtered)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h3" component="h1" gutterBottom>
              Expense Tracker
            </Typography>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} sx={{ mb: 2 }}>
            <Tab label="Dashboard" />
            <Tab label="Add/Edit Expense" />
            <Tab label="Expenses List" />
          </Tabs>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            {currentTab === 0 && <Dashboard expenses={filteredExpenses} />}
            {currentTab === 1 && (
              <ExpenseForm
                onAddExpense={handleAddExpense}
                expenseToEdit={editingExpense}
                onUpdateExpense={handleUpdateExpense}
                onCancel={() => setEditingExpense(null)}
              />
            )}
            {currentTab === 2 && (
              <>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <FilterControls onFilterChange={handleFilterChange} />
                  <ExportData expenses={filteredExpenses} />
                </Box>
                <ExpenseList
                  expenses={filteredExpenses}
                  onDeleteExpense={handleDeleteExpense}
                  onEditExpense={handleEditExpense}
                />
              </>
            )}
          </Paper>
          <ExpenseTotal expenses={filteredExpenses} />
        </Box>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Footer />
      </Container>
    </ThemeProvider>
  )
}

export default App

