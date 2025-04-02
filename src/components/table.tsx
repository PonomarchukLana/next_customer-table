"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Pagination } from "@mui/material";
import { BasicSelect } from "./basicSelector";
import SearchInput from "./searchInput";
import { AddButton } from "./addButton";

const headerTitles = [
  { title: "Tracking ID", sorted: false },
  { title: "Product", sorted: true },
  { title: "Customer", sorted: true },
  { title: "Date", sorted: true },
  { title: "Amount", sorted: false },
  { title: "Payment Mode", sorted: false },
  { title: "Status", sorted: true },
  { title: "Action", sorted: false },
];

export const Table = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/customers?page=${page}&limit=${limit}&search=${search}`)
      .then(({ data }) => {
        setData(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id: string) => {
    setData((prev) => {
      return prev.filter((item) => item.trackingID !== id);
    });
  };

  const handleStatusColor = (status: string) => {
    if (status === "Delivered") {
      return "text-[var(--color-success)] bg-[var(--color-success)]/10";
    } else if (status === "Process") {
      return "text-[var(--color-warn)] bg-[var(--color-warn)]/10";
    }
    return "text-[var(--color-error)] bg-[var(--color-error)]/10";
  };

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    axios
      .get(`/api/customers?page=${value}&limit=${limit}&search=${search}`)
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setPage(value);
  };

  const handleChangeLimit = (arg: number) => {
    setLimit(arg);
    axios
      .get(`/api/customers?page=${page}&limit=${arg}&search=${search}`)
      .then(({ data }) => {
        setData(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (arg: string) => {
    setSearch(arg);
    axios
      .get(`/api/customers?page=${page}&limit=${limit}&search=${arg}`)
      .then(({ data }) => {
        setData(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center py-[10px] px-[15px]">
        <div className="flex items-center gap-x-8 mb-6">
          <div className="text-[var(--color-text)] flex items-center gap-2">
            <p>Show</p>
            <BasicSelect getLimit={(arg: string) => handleChangeLimit(+arg)} />
            <p>entries</p>
          </div>
          <div>
            <SearchInput getSearchQuery={(arg: string) => handleSearch(arg)} />
          </div>
        </div>
        <AddButton />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-[var(--color-text)] whitespace-nowrap">
            {headerTitles &&
              headerTitles.map(({ title, sorted }) => {
                return (
                  <th key={title} className="max-w-[calc(100vw/4)]">
                    <div className="flex justify-between py-[10px] px-[15px] max-w-[calc(100vw/4)]">
                      {title}
                      {sorted && <img src={"/arrow.svg"} />}
                    </div>
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr
                  className={index % 2 ? "" : "bg-[var(--accent-color)]/5"}
                  key={item.trackingID}
                >
                  <td className="text-[var(--color-text)] py-[10px] px-[15px] pl-[40px]">
                    #{item.trackingID}
                  </td>
                  <td className="text-[var(--color-text)] flex py-[10px] px-[15px] max-w-[calc(100vw/4)]">
                    <div className="flex items-center gap-x-3">
                      <div className="rounded-lg overflow-hidden size-[32px]">
                        <img
                          width="32"
                          height="32"
                          src={item.productImage}
                          alt={item.productName}
                        />
                      </div>
                      <p>{item.productName}</p>
                    </div>
                  </td>
                  <td className="text-[var(--color-text)] py-[10px] px-[15px]">
                    {item.customer}
                  </td>
                  <td className="text-[var(--color-text)] py-[10px] px-[15px]">
                    {moment(data).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-[var(--color-text)] py-[10px] px-[15px]">
                    ${item.amount}
                  </td>
                  <td className="text-[var(--color-text)] py-[10px] px-[15px]">
                    {item.paymentMode}
                  </td>
                  <td className="py-[10px] px-[15px]">
                    <div className="bg-white rounded-[22px] w-fit">
                      <div
                        className={`${handleStatusColor(
                          item.status
                        )} flex justify-center rounded-[22px] py-[10px] px-[15px] w-fit`}
                      >
                        {item.status}
                      </div>
                    </div>
                  </td>
                  <td className="text-[var(--color-text)] flex gap-x-3 py-[10px] px-[15px] pr-[40px]">
                    <div>
                      <button className="cursor-pointer">
                        <img src={"/edit.svg"} />
                      </button>
                    </div>
                    <div>
                      <button
                        className="cursor-pointer"
                        onClick={() => handleDelete(item.trackingID)}
                      >
                        <img src={"/trash.svg"} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-2 mt-6">
        <p className="text-[var(--color-text)]">Previous</p>
        <Pagination
          className="flex justify-center py-[10px]"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "var(--color-text)",
            },
            "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected, .Mui-selected:hover":
              {
                backgroundColor: "var(--accent-color)",
                color: "#fff",
              },
            "& .MuiButtonBase-root.MuiPaginationItem-root": {
              backgroundColor: "var(--element-color)",
            },
          }}
          count={totalPages}
          shape="rounded"
          onChange={handleChange}
        />
        <p className="text-[var(--color-text)]">Next</p>
      </div>
    </div>
  );
};
