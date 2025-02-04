import type React from "react"
import { useState } from "react"
import type { Expense } from "../model/Expense"
import { TextField, Button, Grid, Typography, MenuItem } from "@mui/material"

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, "id">) => void
  expenseToEdit?: Expense | null
  onUpdateExpense?: (expense: Expense) => void
  onCancel?: () => void
}

const categories = ["Food", "Transportation", "Housing", "Utilities", "Entertainment", "Healthcare", "Other"]

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, expenseToEdit, onUpdateExpense, onCancel }) => {
  const [description, setDescription] = useState(expenseToEdit?.description || "")
  const [amount, setAmount] = useState(expenseToEdit?.amount.toString() || "")
  const [date, setDate] = useState(expenseToEdit?.date || "")
  const [category, setCategory] = useState(expenseToEdit?.category || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description && amount && date && category) {
      const expenseData = { description, amount: Number.parseFloat(amount), date, category }
      if (expenseToEdit && onUpdateExpense) {
        onUpdateExpense({ ...expenseData, id: expenseToEdit.id })
      } else {
        onAddExpense(expenseData)
      }
      setDescription("")
      setAmount("")
      setDate("")
      setCategory("")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        {expenseToEdit ? "Edit Expense" : "Add New Expense"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            inputProps={{ min: "0", step: "0.01" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {expenseToEdit ? "Update Expense" : "Add Expense"}
          </Button>
        </Grid>
        {expenseToEdit && (
          <Grid item xs={12}>
            <Button variant="outlined" color="secondary" fullWidth onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  )
}

export default ExpenseForm

