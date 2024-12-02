<template>
  <div>
    <b-button variant="success" @click="exportToExcel">Xuất Excel</b-button>
  </div>
</template>

<script>
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { BButton } from "bootstrap-vue";

export default {
  props: {
    fileName: {
      type: String,
      default: "Report.xlsx", // Tên file Excel mặc định
    },
    data: {
      type: Array,
      required: true, // Mảng dữ liệu để xuất
    },
    columns: {
      type: Array,
      required: true, // Các cột để hiển thị
    },
  },
  components: {
    BButton,
  },
  methods: {
    async exportToExcel() {
      try {
        // Tạo workbook và worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Report");

        // Định nghĩa các cột
        worksheet.columns = this.columns.map((col) => ({
          header: col.label, // Tên cột
          key: col.field, // Thuộc tính trong dữ liệu
          width: col.width || 20, // Chiều rộng cột mặc định
        }));

        // Thêm dữ liệu vào worksheet
        this.data.forEach((row) => {
          worksheet.addRow(row);
        });

        // Định dạng tiêu đề (style cho hàng đầu tiên)
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        // Lưu workbook thành file
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), this.fileName);
      } catch (error) {
        console.error("Lỗi khi xuất Excel:", error);
      }
    },
  },
};
</script>
