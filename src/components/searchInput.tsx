import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  getSearchQuery: (agr: string) => void;
};

let debounceQuery = false;

const SearchInput: React.FC<Props> = ({ getSearchQuery }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debounceQuery = true;

    setTimeout(() => {
      if (debounceQuery) {
        getSearchQuery(event.target.value);
        debounceQuery = false;
      }
    }, 1000);
  };

  return (
    <TextField
      variant="outlined"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search..."
      fullWidth
      sx={{
        "& .MuiInputBase-input": {
          color: "var(--secondary-color)",
          padding: "10px",
        },
        "& .MuiInputAdornment-root": {
          color: "var(--secondary-color)",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          backgroundColor: "var(--primary-color)",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--secondary-color)",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "var(--secondary-color)",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "var(--secondary-color)" }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
