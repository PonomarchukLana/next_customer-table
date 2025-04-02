import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const AddButton = () => {
  return (
    <Button
      variant="outlined"
      startIcon={<AddIcon />}
      sx={{
        backgroundColor: "var(--accent-color)",
        borderRadius: "8px",
        border: "2px solid var(--accent-color)",
        color: "#fff",
        textTransform: "capitalize",
        "&:hover": {
          opacity: 0.6,
        },
      }}
    >
      Add Customer
    </Button>
  );
};
