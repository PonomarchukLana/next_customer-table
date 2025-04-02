import fs from "fs";
import path from "path";

export const filePath = path.join(
  process.cwd(),
  "src",
  "data",
  "sample_dataset_final_update.json"
);

const toCamelCase = (str: string) => {
  return str
    .replace(/\s(.)/g, (match) => match.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, (match) => match.toLowerCase());
};

const transformKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformKeys);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey: string = toCamelCase(key);
      acc[newKey] = transformKeys(obj[key]);
      return acc;
    }, {} as Record<string, unknown>);
  }
  return obj;
};

export const getData = (): any[] => {
  const data = fs.readFileSync(filePath, "utf8");
  const transformData = transformKeys(JSON.parse(data));

  return transformData;
};
