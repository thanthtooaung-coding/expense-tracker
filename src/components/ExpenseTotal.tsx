import type React from "react"
import type { Expense } from "../model/Expense"
import { Typography, Paper } from "@mui/material"

interface ExpenseTotalProps {
  expenses: Expense[]
}

export const ExpenseTotal: React.FC<ExpenseTotalProps> = ({ expenses }) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        Total Expenses: {total.toFixed(2)} ฿
      </Typography>
    </Paper>
  )
}

