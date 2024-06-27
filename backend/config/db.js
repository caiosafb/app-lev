const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/dblev');
        console.log('Conectado ao banco de dados');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

main();

module.exports = mongoose;