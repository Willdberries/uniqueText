import {useState} from 'react';
import './App.css';

const replacer = (text: string, world: string) =>{
return text.replaceAll(world, "");
}


function App() {
const [textareaText ,setTextareaText] = useState<string>('')
const [world ,setWorld] = useState<string>('')
const [text ,setText] = useState<string>('')



const handleClick = () =>{
  if(textareaText && world) {
    const newText = replacer(textareaText, world)
    setText(newText)
    navigator.clipboard.writeText(newText)
  }
}

const getUnickStr = (currentText: string): string =>{
  const newTxt = currentText.replaceAll('\n', ' ').split(' ').reduce((acc: Record<string, string>, value: string)=>{
    if(acc[value]){
     return acc
    } else {
     return {...acc, [value]: value}
    }
   },{})
   const newText = Object.values(newTxt).join(' ')
  setText(newText)
  return newText
}

const handleClickUnick = () =>{
  if(textareaText) {
   getUnickStr(textareaText)
  }
  
}

  return (
    <>
    <div className="App">
      <textarea 
      className='textarea'
      value={textareaText}
      onChange={(e)=>setTextareaText(e.currentTarget.value)}
      />
      <div>

               <input 
      className='input'
      value={world}
      onChange={(e)=>setWorld(e.currentTarget.value)}
      />
      <button className='Button' onClick={handleClick} >
        Форматировать
      </button>
      <button className='Button' onClick={handleClickUnick} >
        Сделать уникальным
      </button>
      </div>

    </div>
    <div>
      {text}
    </div>
    </>
  );
}

export default App;
