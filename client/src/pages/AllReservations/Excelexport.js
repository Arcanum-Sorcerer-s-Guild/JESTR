import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { AiFillTool } from 'react-icons/ai';

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <div title="Excel Export">
      <button
        className="flex items-center gap-1 justify-center bg-blue-darker text-gray-light text-xs my-4 px-4 rounded-md shadow-lg"
        variant="contained"
        onClick={(e) => exportToExcel(fileName)}
      >
        <span>
          <AiFillTool />
        </span>
        Export to Excel
      </button>
    </div>
  );
};

export default ExportExcel;
