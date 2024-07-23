import {useState} from 'react';
import './App.css';

const replacer = (text: string, world: string) => {
    return text.replaceAll(world, "");
}


function App() {
    const [textareaText, setTextareaText] = useState<string>('')
    const [world, setWorld] = useState<string>('')
    const [text, setText] = useState<string>('')

const setWriteText = async (newText: string) => {
    navigator.clipboard.writeText(newText)
        .then(() => {
            alert('Текст успешно скопирован в буфер обмена');
        })
}

    const handleClick =  () => {
        if (textareaText && world) {
            const newText = replacer(textareaText, world)
            setText(newText)
            setWriteText(newText)
        }
    }

    const getUnickStr =  (currentText: string): string => {
        const newTxt = currentText.replaceAll('\n', ' ').split(' ').reduce((acc: Record<string, string>, value: string) => {
            if (acc[value]) {
                return acc
            } else {
                return {...acc, [value]: value}
            }
        }, {})
        const newText = Object.values(newTxt).join(' ')
        setText(newText)
        setWriteText(newText)
        return newText
    }

    const handleClickUnick = () => {
        if (textareaText) {
            getUnickStr(textareaText)
        }

    }

    return (
        <div className={'App-container'}>
            <div className={'description'}>
                <p>Кнопка</p>
                <button className='Button'>
                    Форматировать
                </button>
                <p>Убирает строки введеные в инпут</p>
            </div>

            <div className={'description'}>
                <p>Кнопка</p>
                <button className='Button'>
                    Сделать уникальным
                </button>
                <p>Очищает дубликаты слов</p>
            </div>

            <div className="App">
                   <textarea
                       className='textarea'
                       value={textareaText}
                       onChange={(e) => setTextareaText(e.currentTarget.value)}
                   />
                <div>
                    <input
                        className='input'
                        value={world}
                        onChange={(e) => setWorld(e.currentTarget.value)}
                    />
                    <button className='Button' onClick={handleClick}>
                        Форматировать
                    </button>
                    <button className='Button' onClick={handleClickUnick}>
                        Сделать уникальным
                    </button>
                </div>

            </div>
            <div className={'text'}>
                 <textarea
                     disabled={true}
                     className='textarea-text'
                     value={text}
                 />
            </div>
        </div>
    );
}

export default App;
