const express = require(`express`);
const mongoose = require(`mongoose`);
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


const port = 3000;

app.listen(port, () =>{
    mongoose.connect('mongodb+srv://klaivencastro:**SENHA**@contato.xkdydzr.mongodb.net/?retryWrites=true&w=majority&appName=contato');

    console.log(`BackEnd Rodando na porta ${port}`);

})


const Contato = mongoose.model('contato', {
    nome: String,
    numero: String
});

app.put('/:id', async(req, res) =>{
    const contato = await Contato.findByIdAndUpdate(req.params.id,{
        nome: req.body.nome,
        numero: req.body.numero
    }, {
        new: true
    })

    return res.send(contato)
})

app.post('/', async (req, res) => {

    const contato = new Contato({
        nome: req.body.nome,
        numero: req.body.numero
    });

    await contato.save()
    return res.send(contato)
})

app.get('/', async (req, res) =>{
    const contatos = await Contato.find()
    return res.send(contatos)
})

app.delete('/:id', async(req, res) =>{
    const contato = await Contato.findByIdAndDelete(req.params.id)
    return res.send(contato)
})