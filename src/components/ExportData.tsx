import type React from "react"
import { Button } from "@mui/material"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import type { Expense } from "../model/Expense"

interface ExportDataProps {
  expenses: Expense[]
}

export const ExportData: React.FC<ExportDataProps> = ({ expenses }) => {
  const exportToCSV = () => {
    const headers = ["Description", "Amount", "Date", "Category"]
    const csvContent = [
      headers.join(","),
      ...expenses.map((expense) => `${expense.description},${expense.amount},${expense.date},${expense.category}`),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "expenses.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={exportToCSV}>
      Export to CSV
    </Button>
  )
}

