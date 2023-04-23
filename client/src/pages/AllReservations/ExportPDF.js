import { jsPDF } from 'jspdf';
import { AiFillTool } from 'react-icons/ai';

const ExportPDF = ({divId, title}) => {
    var doc = new jsPDF({
        orientation: 'landscape'
    });
    
    const saveDiv = (divId) => {
        doc.html(document.querySelector(`#${divId}`), {
            callback: function(doc) {
                // Save the PDF
                doc.text('hello', 5, 5)
                doc.save('sample-document.pdf');
            },
            x: 15,
            y: 15,
            width: 270, //target width in the PDF document
            windowWidth: 1550 //window width in CSS pixels
        });
    }
    return (
        <div>
            <button 
                className='flex items-center gap-1 justify-center bg-blue-darker text-gray-light text-xs my-4 px-4 rounded-md shadow-lg' 
                variant='contained'
                onClick={(e) => saveDiv(divId)}
            > 
                <span><AiFillTool/></span>Save as pdf
            </button>
        </div>
    );
}

export default ExportPDF;
