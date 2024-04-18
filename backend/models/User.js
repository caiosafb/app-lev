const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O nome é obrigatório.'
            },
            len: {
                args: [2, 100],
                msg: 'O nome deve ter entre 2 e 100 caracteres.'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'O email é obrigatório.'
            },
            isValidEmail(value) {
                if(!value.includes('@')) {
                    throw new Error('o email fornecido não é valido')
                }
            }
        }
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'O CPF é obrigatório.'
            },
            is: {
                args: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                msg: 'O CPF fornecido não é válido.'
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Se desejar que o telefone seja único
        validate: {
            notNull: {
                msg: 'O número de telefone é obrigatório.'
            },
            is: {
                args: /^\(\d{2}\)\s\d{4,5}-\d{4}$/, // Expressão regular para validar o formato do telefone
                msg: 'O número de telefone fornecido não é válido. O formato deve ser (99) 99999-9999.'
            }
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Cliente' // Valor padrão para o campo 'type'
    },
    companyCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 // Valor padrão para o campo 'companyCode'
    },
    cep: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true // Permitir que seja preenchido automaticamente pelo CEP
    },
    number: {
        type: DataTypes.STRING,
        allowNull: true // Permitir que seja preenchido automaticamente pelo CEP
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true // Permitir que seja preenchido automaticamente pelo CEP
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: true // Permitir que seja preenchido automaticamente pelo CEP
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true // Permitir que seja preenchido automaticamente pelo CEP
    },
    cityCode: {
        type: DataTypes.INTEGER, // Se for um código de cidade, pode ser INTEGER
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A data de aniversário é obrigatória.'
            },
            isValidDate(value) {
                if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                    throw new Error('A data de aniversário deve estar no formato DD-MM-YYYY.');
                }
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A senha é obrigatória.'
            },
            isSecure(value) {
                if (!value.match(/^(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[A-Z])(?=.*[0-9]).{8,}$/)) {
                    throw new Error('A senha deve conter pelo menos 8 caracteres, incluindo pelo menos um caractere especial, uma letra maiúscula e um numeral.');
                }
            }
        }
    },

    confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A confirmação de senha é obrigatória.'
            },
            matchesPassword(value, { req }) {
                if (value !== req.body.password) {
                    throw new Error('As senhas não coincidem.');
                }
            }
        }
    },
    timestamps: true
});

module.exports = User;
