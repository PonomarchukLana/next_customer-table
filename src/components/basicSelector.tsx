"useClient";

import { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  getLimit: (arg: string) => void;
};

export const BasicSelect: React.FC<Props> = ({ getLimit }) => {
  const [limit, setLimit] = useState("10");

  const handleChange = (event: SelectChangeEvent) => {
    getLimit(event.target.value as string);
    setLimit(event.target.value as string);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <Select
          className="bg-[var(--element-color)] text-[var(--color-text)]"
          labelId="limit-label"
          id="demo-simple-select"
          value={limit}
          onChange={handleChange}
          sx={{
            color: "var(--color-text)",
            "& .MuiSelect-root": {
              borderRadius: "10px",
            },
            "& .MuiSelect-icon": {
              color: "var(--color-text)",
            },
            "& .MuiOutlinedInput-root": {
              border: "none",
            },
            "& .MuiSelect-select": {
              padding: "10px",
              maxWidth: "20px",
            },
          }}
        >
          <MenuItem className="bg-[var(--element-color)]" value={10}>
            10
          </MenuItem>
          <MenuItem className="bg-[var(--element-color)]" value={20}>
            20
          </MenuItem>
          <MenuItem className="bg-[var(--element-color)]" value={30}>
            30
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
