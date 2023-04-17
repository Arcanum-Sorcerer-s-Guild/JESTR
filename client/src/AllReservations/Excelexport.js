import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

const ExportExcel = ({excelData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async() => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: {'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], { type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return ( 
        <div title="Excel Export">
            <button className="mt-4 p-2 m-4 w-32 rounded-md shadow-md bg-blue hover:bg-bluer text-text text-center" variant='contained'
                onClick={(e) => exportToExcel(fileName)}>Excel Export</button>
        </div>
     );
}
 
export default ExportExcel;
