import type React from "react"
import type { Expense } from "../model/Expense"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

interface ExpenseListProps {
  expenses: Expense[]
  onDeleteExpense: (id: number) => void
  onEditExpense: (expense: Expense) => void
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense, onEditExpense }) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Showing {expenses.length} expense{expenses.length !== 1 ? "s" : ""}
      </Typography>
      {expenses.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", my: 2 }}>
          No expenses found.
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEditExpense(expense)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteExpense(expense.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

