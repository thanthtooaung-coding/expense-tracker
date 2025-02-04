import type React from "react"
import { Grid, Paper, Typography, Box } from "@mui/material"
import type { Expense } from "../model/Expense"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface DashboardProps {
  expenses: Expense[]
}

export const Dashboard: React.FC<DashboardProps> = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0
  const highestExpense = Math.max(...expenses.map((expense) => expense.amount))

  const categoryData = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(categoryData).map(([category, amount]) => ({
    category,
    amount,
  }))

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Total Expenses
          </Typography>
          <Typography component="p" variant="h4">
            ${totalExpenses.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Average Expense
          </Typography>
          <Typography component="p" variant="h4">
            ${averageExpense.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Highest Expense
          </Typography>
          <Typography component="p" variant="h4">
            ${highestExpense.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Expenses by Category
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

