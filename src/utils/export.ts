import {utils, writeFile} from "xlsx";

export const handleExportData = (data: any[]) => {
  let wb = utils.book_new();
  let ws = utils.json_to_sheet(data);
  utils.book_append_sheet(wb, ws, "Sheet1");
  writeFile(wb, "report.xlsx")
}