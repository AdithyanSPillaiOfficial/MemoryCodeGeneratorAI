import { useState } from 'react';
import './App.css';

async function processReq(text, setMemcode, setLoading) {
  setLoading(true);
  const serverAddress = "https://memorycodegeneratorai.onrender.com"
  try {
    const response = await fetch(serverAddress+'/memcode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({ // Stringify the JSON object
          text: text
        }),
    });

    if (response.ok) {
      const data = await response.json();
      if(data.success){
        console.log(data.message)
        setLoading(false)
        setMemcode(data.message)
      }

    } else {
        // Handle HTTP error responses here
        alert('HTTP Error: ' + response.status);
    }
} catch (error) {
    // Handle network or other errors here
    console.error('Error:', error);
}  
}

function App() {
  var [text,setText] = useState('');
  var [memcode, setMemcode] = useState('');
  var [visibility, setVisibility] = useState(false);
  var [loading, setLoading] = useState(true);
  return (
    <div className="App">
      <h1>Memory Code Generator</h1>
      <textarea name="question" id="texttarea" cols="100" rows="10" className='textinput' placeholder='Enter The Portion which you want to make memory code' value={text} onChange={(e)=>setText(e.target.value)}></textarea>
      <button className='submitbtn' onClick={()=>{processReq(text, setMemcode,setLoading); setVisibility(true);}}> <span>Submit</span><i></i></button>
      { visibility &&
      <div className='displayresult'>
        <h2>Memory Code</h2>
        {loading ? <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : <p>{memcode}</p>}
      </div>
      }
      <div className='footerdiv'>Developed By <a href="https://www.instagram.com/adithyan_s_.pillai/" className='atag'>Adithyan S Pillai</a></div>
    </div>
  );
}

export default App;
