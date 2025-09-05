import dotenv from "dotenv"
const db = require("../models");
const User = db.Usuario;
const Sessao = db.Sessao

dotenv.config()

export const login2 = async (data: any) => {

    if (!data.usuario || !data.senha) {
        throw new Error("senha obrigatória")
    }

    const user = await User.findOne({ where: { usuario: data.usuario } });

    if (!user || !user.check(data.senha)) {
        throw new Error("Email e/ou senha incorreta!")
    }

    return user
};