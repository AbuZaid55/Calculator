import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [inputs, setInput] = useState('')
  const [result, setResult] = useState()
  const operators = ['+', '-', 'x', '/', '%']

  const handleExpression = (val1, opr, val2) => {
    val1 = Number(val1)
    val2 = Number(val2)
    let result = ''
    switch (opr) {
      case '+':
        result = val1 + val2
        break;
      case '-':
        result = val1 - val2
        break;
      case 'x':
        result = val1 * val2
        break;
      case '/':
        result = val1 / val2
        break;
      case '%':
        result = val1 % val2
        break;
      default:
        break;
    }
    return result;
  }

  const handleInput = (val) => {
    const p = document.querySelector('.result')
    p.style.backgroundColor = "#F3F7EC"
    p.style.color = "#005C78"
    if (val === "AC") {
      setResult('')
      setInput('')
    } else if (val === "DE") {
      setInput((input) => input.slice(0, -1))
    } else if (val === "=") {
      p.style.backgroundColor = "#06D001"
      p.style.color = "#F3F7EC"
    } else if (operators.includes(val)) {
      if (inputs && !operators.includes(inputs[inputs.length - 1])) {
        setInput(inputs + val)
      }
    } else {
      setInput((input) => input + val)
    }
  }

  useEffect(() => {
    let result = 0;
    if (!inputs) return;
    let arr = inputs.split(/([+\-%x/])/).filter(token => token !== '')
    for (let i = 0; i < arr.length; i++) {
      if (i != 0 && i % 2 == 0) {
        if (i == 2) {
          result = handleExpression(arr[0], arr[1], arr[2])
        } else {
          result = handleExpression(result, arr[i - 1], arr[i])
        }
      }
    }
    if (arr.length <= 2) {
      setResult('')
    } else {
      setResult(result)
    }
  }, [inputs])
  return (
    <div className='container'>
      <div className='output'>
        <input value={inputs} onChange={() => { }} className='input' />
        <p className='result'>{result}</p>
      </div>
      <div>
        <button onClick={() => handleInput('AC')}>AC</button>
        <button onClick={() => handleInput('%')}>%</button>
        <button onClick={() => handleInput('DE')}>DE</button>
        <button onClick={() => handleInput('/')}>/</button>
      </div>
      <div>
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleInput('x')}>x</button>
      </div><div>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleInput('-')}>-</button>
      </div><div>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleInput('+')}>+</button>
      </div><div>
        <button onClick={() => handleInput('00')}>00</button>
        <button onClick={() => handleInput('0')}>0</button>
        <button onClick={() => handleInput('.')}>.</button>
        <button onClick={() => handleInput('=')}>=</button>
      </div>
    </div>
  )
}

export default App
