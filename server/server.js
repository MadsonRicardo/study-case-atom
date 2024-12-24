const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json());

const users = [
    { email: 'madson.ricardo@teste.com', password: 'qwerty' },
    { email: 'madson.miranda@teste.com', password: '123456' },
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, message: 'Login bem-sucedido!' });
    } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
    }
});


app.listen(3000, () => {
    console.log('Servidor Express rodando na porta 3000');
});