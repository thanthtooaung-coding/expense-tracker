import type React from "react"
import { useState } from "react"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
import CloseIcon from "@mui/icons-material/Close"

interface FilterControlsProps {
  onFilterChange: (filter: FilterOptions) => void
}

export interface FilterOptions {
  startDate: string
  endDate: string
  minAmount: string
  maxAmount: string
}

export const FilterControls: React.FC<FilterControlsProps> = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<FilterOptions>({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
  })
  const [appliedFilter, setAppliedFilter] = useState<FilterOptions>({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleFilter = () => {
    onFilterChange(filter)
    setAppliedFilter(filter)
    handleClose()
  }

  const handleClear = () => {
    const clearedFilter = {
      startDate: "",
      endDate: "",
      minAmount: "",
      maxAmount: "",
    }
    setFilter(clearedFilter)
    setAppliedFilter(clearedFilter)
    onFilterChange(clearedFilter)
    handleClose()
  }

  const isFilterApplied = Object.values(appliedFilter).some((value) => value !== "")

  return (
    <Box sx={{ mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Expenses</Typography>
        <Box>
          {isFilterApplied && <Chip label="Filters applied" color="primary" onDelete={handleClear} sx={{ mr: 1 }} />}
          <Button variant="outlined" startIcon={<FilterListIcon />} onClick={handleOpen}>
            Filter
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Filter Expenses
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={filter.startDate}
                onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={filter.endDate}
                onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Min Amount"
                type="number"
                fullWidth
                value={filter.minAmount}
                onChange={(e) => setFilter({ ...filter, minAmount: e.target.value })}
                inputProps={{ min: "0", step: "0.01" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Max Amount"
                type="number"
                fullWidth
                value={filter.maxAmount}
                onChange={(e) => setFilter({ ...filter, maxAmount: e.target.value })}
                inputProps={{ min: "0", step: "0.01" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear} color="secondary">
            Clear
          </Button>
          <Button onClick={handleFilter} color="primary" variant="contained">
            Apply Filter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

