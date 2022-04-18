const convertToCSV = (objArray, title) => {

    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = (title + '\r\n\n');

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (const index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}


const exportCSVFile = (csv, fileTitle) => {

    const exportedFilenmae = fileTitle + '.csv' || 'export.csv';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) {

        navigator.msSaveBlob(blob, exportedFilenmae);

    } else {

        const link = document.createElement("a");

        if (link.download !== undefined) {

            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }
    }
}

const generateCSV = (headers, items, title) => {

    if (headers) {
        items.unshift(headers);
    }

    const jsonObject = JSON.stringify(items);

    return convertToCSV(jsonObject, title);
}

export { generateCSV, exportCSVFile };