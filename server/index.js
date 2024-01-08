require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { OpenAI } = require("openai");
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// Mock database of usernames and passwords (for demonstration purposes)
const users = [
  { username: 'test', password: 'test',name:'Test User', role:'Clerk' },
  { username: 'user2', password: 'password2', name:'User', role:'Personal Account' },
  {username: 'Adithyan', password: 'Adi@123', name:'Adithyan S Pillai', role:'Admin'}
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simulate a database query to find the user
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful', name: user.name, role:user.role });
  } else {
    //res.status(401).json({ success: false, message: 'Invalid credentials' });
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/memcode',async (req,res)=>{
    var {text} = req.body;
    console.log(text);
    text = text + "\n\ncreate a simple real life related mnemonic sentence for a memory code for memorizing this in maximum less number of words"

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": text
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    //console.log(response);

    console.log(response.choices[0].message.content)


    res.json({success: true, message: response.choices[0].message.content});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});