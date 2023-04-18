import { jsPDF } from 'jspdf';

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
            <button className="mt-4 p-2 m-4 w-32 rounded-md shadow-md bg-blue hover:bg-bluer text-text text-center" variant='contained'
                onClick={(e) => saveDiv(divId)}>Save as pdf</button>
        </div>
    );
}

export default ExportPDF;
