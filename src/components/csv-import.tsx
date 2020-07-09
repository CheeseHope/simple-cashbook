import React from 'react'
import { connect } from 'react-redux'
import { importCsv } from '../redux/actions'

interface Props {
    csvType: 'bill' | 'category';
    importCsv(type: 'bill' | 'category', csvText: any): void;
}

function CsvImport(props: Props) {
    const changeFile = (type: 'bill' | 'category', files: any) => {
        if (files.length) {
            var file = files[0]
            if (file.name.indexOf('.csv') === -1) {
                alert('上传文件类型不支持，请上传csv文件！')
                return
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log(e)
                props.importCsv(type, e.target ? e.target.result : '')
            };
            reader.readAsText(file);
        }
    }

    return (<input type="file" onChange={(e) => changeFile(props.csvType, e.target.files ? e.target.files : '')} />)
}

export default connect(null, {
    importCsv
})(CsvImport)