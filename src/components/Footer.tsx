import type React from "react"
import { Box, Typography, Link, IconButton } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => (theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.03)"),
        borderRadius: 2,
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Developed with 🔥 by{" "}
        <Link
          href="https://github.com/thanthtooaung-coding"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Thant Htoo Aung
        </Link>
      </Typography>
      <IconButton
        href="https://github.com/thanthtooaung-coding"
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={{
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <GitHubIcon />
      </IconButton>
    </Box>
  )
}

