const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'User',
        {
            // Model attributes are defined here
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 3 et 50.",
                        args: [3, 50]
                    }
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8, 64], // Ensures the password is between 8 and 64 characters long
                    notEmpty: true
                }
            },
            surname: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING
            },
            postCode: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: true,
                    len: [5, 5],
                    min: 10000,
                    max: 99999 
                },
                allowNull: false
            },
            city: {
                type: DataTypes.STRING
            },
            // validation de mail
            email: {
                type: DataTypes.STRING,
                allowNull: false,   
                unique: true,
                validate: {
                    isEmail: {
                        msg: "email incorrect",
                    }
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isNumeric: true,
                    len: [10, 10]
                }
            },
            howChessbar: {
                type: DataTypes.TEXT
            },
        },
        {
            onDelete: 'CASCADE',
            // Par défaut, tous les getters/finders n'ont plus l'attribut password (server -> client), attention aux méthodes qui mettent à jour/créent un password (client -> server)
            defaultScope: {
                attributes: { exclude: ['password'] }
            },
            // L'unique besoin d'un password en get, c'est pour la route login, car on compare le password en bdd avec les données du req.body
            scopes: {
                withPassword: {
                    attributes: {}
                }
            },
            hooks: {
                afterCreate: (record) => {
                    delete record.dataValues.password;
                },
                afterUpdate: (record) => {
                    delete record.dataValues.password;
                },
            }
        },
    );
}
