const mongoose = require('../config/db');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'O nome de usuário é obrigatório.'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\S*$/.test(v);
            },
            message: props => `${props.value} não deve conter espaços`
        },
        minlength: [2, 'O nome deve ter entre 2 e 100 caracteres.'],
        maxlength: [100, 'O nome deve ter entre 2 e 100 caracteres.']
    },
    cpf: {
        type: String,
        required: [true, 'O CPF é obrigatório.'],
        unique: true,
        validate: {
            validator: function(value) {
                return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
            },
            message: 'O CPF fornecido não é válido.'
        }
    },
    type: {
        type: String,
        default: 'Cliente'
    },
    companyCode: {
        type: Number,
        default: 1
    },
    cep: {
        type: String,
    },
    address: {
        type: String,
    },
    number: {
        type: String,
    },
    complement: {
        type: String,
    },
    neighborhood: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    cityCode: {
        type: Number,
    },
    birthday: {
        type: Date,
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'A data de aniversário deve estar no formato AAAA-MM-DD.'
        }
    },
    password: {
        type: String,
        validate: {
            validator: function(value) {
                return /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value);
            },
            message: 'A senha deve conter pelo menos 8 caracteres, incluindo pelo menos um caractere especial, uma letra maiúscula e um numeral.'
        }
    }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
