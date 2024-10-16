import {useState} from 'react';
import './App.css';

function App() {
    const [textareaText, setTextareaText] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [table, setTable] = useState<{ first: string, second: string }[]>([])

    const setWriteText = async (newText: string) => {
        navigator.clipboard.writeText(newText)
            .then(() => {
                alert('Таблица успешно скопирован в буфер обмена');
            })
    }

    const handleClick = () => {
        text && setWriteText(text)
    }

    const getUnickStr = (currentText: string): string => {
        let table: { first: string, second: string }[] = []
        const filteredTable = currentText.split('\n').reduce((acc: Record<string, string>, value: string) => {
            const a = value.split('\t')
            if (a[0] in acc) {
                return acc
            } else {
                table.push({first: a[0] + '\t', second: (a[1] || '') + '\n'})
                return {...acc, [a[0]]: a[0] + '\t' + (a[1] || '') + '\n'}
            }
        }, {})

        const tableText = Object.values(filteredTable).join(' ')
        setText(tableText)
        setWriteText(tableText)
        setTable(table)
        table = []
        return tableText
    }

    const handleClickUnick = () => {
        if (textareaText) {
            getUnickStr(textareaText)
        }

    }

    return (
        <div className={'App-container'}>
            <div className="App">
                   <textarea
                       className='textarea'
                       value={textareaText}
                       onChange={(e) => setTextareaText(e.currentTarget.value.trim())}
                   />
                <button className='Button' onClick={handleClickUnick}>
                    Сделать уникальным
                </button>
                <table className={'table'}>
                    {table.map((values, i) => {
                        return (
                            <tr key={`${values?.first}${values?.second}${i}`}>
                                <td className={'td'}>{i + 1}</td>
                                <td className={'td'}>{values?.first}</td>
                                {values?.second && <td className={'td'}>{values?.second}</td>}
                            </tr>
                        )
                    })}
                </table>
                {table.length && <button className='Button' onClick={handleClick}>
                    Скопировать таблицу
                </button>}
            </div>
        </div>
    );
}

export default App;
