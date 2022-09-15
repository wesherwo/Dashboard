import React, { useState } from 'react';
import { Box, Button, FileInput, Select, Text } from 'grommet';
import { FormClose } from 'grommet-icons';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function CsvGraph() {
    const [graphDisplay, setGraphDisplay] = useState(false)
    const [selected, setSelected] = useState([])
    const [columns, setColumns] = useState([])
    const [csvArrays, setCsvArays] = useState([])
    const [fileNames, setFileNames] = useState([])
    const [shortest, setShortest] = useState(0)

    function highchartOptions(index) {
        return {
            title: {
                text: columns[index],
            },
            yAxis: {
                title: {
                    text: columns[index]
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 0
                }
            },
            series: getData(index),
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }
    }

    function getData(index) {
        var trimmed = []
        var i = 0
        csvArrays.forEach(csv => {
            var name = fileNames[i]
            var csvData = []
            csv.forEach(time => {
                csvData.push(time[columns[index]])
            })
            trimmed.push(
                {
                    name: name,
                    data: csvData.slice(-50)
                })
            i++
        })
        return trimmed;
    }

    function setFiles(upload) {
        var arrays = []
        var names = []
        upload.forEach(csv => {
            if (shortest === 0 || csv.length < shortest) 
                setShortest(csv.length)
            names.push(csv.name)
            const input = csv
            const reader = new FileReader()

            reader.onload = function (e) {
                const text = e.target.result
                const data = csvToArray(text)
                arrays.push(data)
            };
            reader.readAsText(input)
        });
        setCsvArays(arrays)
        setFileNames(names)
        setGraphDisplay(true)
    }

    function csvToArray(str, delimiter = ",") {
        const headers = str.slice(0, str.indexOf("\n")).replace(/"/g, '').split(delimiter)
        setColumns(headers)
        const rows = str.slice(str.indexOf("\n") + 1).split("\n")
        const arr = rows.map(function (row) {
            const values = row.split(delimiter)
            const el = headers.reduce(function (object, header, index) {
                object[header] = parseFloat(values[index])
                return object
            }, {})
            return el
        })
        return arr
    }

    const onRemoveSelection = (selection) => {
        const selectionIndex = columns.indexOf(selection);
        setSelected(
            selected.filter((selectedSelection) => selectedSelection !== selectionIndex),
        );
    };

    const renderSelection = (selection) => (
        <Button key={`column_tag_${selection}`} href="#" onFocus={(event) => event.stopPropagation()}
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onRemoveSelection(selection);
            }}
        >
            <Box align="center" direction="row" gap="xsmall" pad={{ vertical: 'xsmall', horizontal: 'small' }} margin="xsmall" background="brand" round="large">
                <Text size="small">{selection}</Text>
                <Box round="full" margin={{ left: 'xsmall' }}>
                    <FormClose size="small" style={{ width: '12px', height: '12px' }} />
                </Box>
            </Box>
        </Button>
    )

    const graphs = (selection) => (
        <Box fill background={'background'}>
            <HighchartsReact highcharts={Highcharts} options={highchartOptions(selection)} key={`graph_${selection}`} />
        </Box>
    )

    return (
        <Box fill background={'background'} pad='medium'>
            {graphDisplay &&
                <Box direction="row">
                    <Select multiple clear={true} closeOnChange={false} dropHeight='large' options={columns} onChange={({ selected: nextSelected }) => { setSelected([...nextSelected].sort()); }} selected={selected}
                        value={<Box wrap direction="row" width="small">
                            {selected && selected.length ? (selected.map((index) => renderSelection(columns[index])))
                                :
                                (<Box pad={{ vertical: 'xsmall', horizontal: 'small' }} margin="xsmall">
                                    Select Stats
                                </Box>
                                )}
                        </Box>} />
                </Box>
            }
            {graphDisplay && selected.map((index) => graphs(index))}
            {!graphDisplay && <FileInput multiple onChange={(event, { files }) => { setFiles(files) }} />}
        </Box>
    );
}