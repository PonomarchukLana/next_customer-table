import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "@/helpers";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const mockData = getData();

    const searchQuery = (req.query.search as string)?.toLowerCase() || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const filteredData = searchQuery
      ? mockData.filter((item) =>
          item.productName.toLowerCase().includes(searchQuery)
        )
      : mockData;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    res.status(200).json({
      page,
      limit,
      totalItems: filteredData.length,
      totalPages: Math.ceil(filteredData.length / limit),
      data: paginatedData,
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
