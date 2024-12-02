import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

/**
 * Hàm xuất dữ liệu ra file Excel
 * @param {String} fileName - Tên file Excel (mặc định là "Report.xlsx")
 * @param {Array} data - Mảng dữ liệu để xuất
 * @param {Array} columns - Cấu hình các cột trong Excel (label, field, width)
 */
export async function exportExcel(
  fileName = "Report.xlsx",
  data = [],
  columns = []
) {
  try {
    // Tạo workbook và worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // Định nghĩa các cột
    worksheet.columns = columns.map((col) => ({
      header: col.label, // Tên cột
      key: col.field, // Thuộc tính trong dữ liệu
      width: col.width || 20, // Chiều rộng cột mặc định
    }));

    // Thêm dữ liệu vào worksheet
    data.forEach((row) => {
      worksheet.addRow(row);
    });

    // Định dạng tiêu đề (style cho hàng đầu tiên)
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    // Ghi workbook thành buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Sử dụng FileSaver để tải file xuống
    saveAs(new Blob([buffer]), fileName);
  } catch (error) {
    console.error("Lỗi khi xuất Excel:", error);
  }
}
