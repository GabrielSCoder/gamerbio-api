import { usuarioDTO, usuario, usuarioLogin, usuarioRegister } from "../types/usuarioT";
import { reservedWords } from "../utils/reservedString";

const { Usuario, Url, Favorite, sequelize } = require("../models");

const validate = async (data: usuarioRegister) => {

    var erros: string[] = []


    if (!data.usuario || data.usuario == "") {

        erros.push("Usuário obrigatório")

    } else {
        const userExists = await Usuario.findOne({ where: { usuario: data.usuario } })

        if (userExists) {
            erros.push("Nome de usuário já utilizado")
        }
    }

    if (!data.senha || data.senha == "") {
        erros.push("Senha vazia")
    } else {
        if (data.senha.length < 8) {
            erros.push("Senha precisa ter ao menos 8 caracteres")
        }
    }

    if (!data.data_nascimento) {
        erros.push("Data de nascimento obrigatória")
    }

    if (erros.length > 0) throw new Error(erros.toString())
}

const convertToDTO = async (data: usuario) => {

    var item: usuarioDTO = {
        id: data.id,
        usuario: data.usuario,
        avatar_url: data.avatar_url,
        texto_bio: data.texto_bio,
        data_criacao: data.data_criacao,
        data_modificacao: data.data_modificacao
    }

    return item
}

export const create = async (data: usuarioRegister) => {

    await validate(data)

    const user = await Usuario.create({ ...data, data_criacao: Date.now() });

    return user.id
}

export const getById = async (id: any) => {

    const resp = await Usuario.findByPk(id)

    if (!resp) throw new Error("Usuario não encontrado")

    return await convertToDTO(resp)
}

export const getByUsername = async (usuario: string) => {


    const resp = await Usuario.findOne({ where: { usuario: usuario } })

    if (!resp) throw new Error("Username não encontrado")

    return await convertToDTO(resp)
}


export const verifyUsername = async (username: string) => {

    if (!username || username && typeof (username) == "number" || username.includes(reservedWords)) {
        return ({ success: false, message: "username inválido" })

    } else if (username.length > 2 && username.length < 51) {

        const resp = await Usuario.findOne({ where: { username: username } })

        if (resp) {
            return ({ success: false, message: "username em uso" })
        }

    } else {
        return ({ success: false, message: "tamanho de username inválido" })
    }

    return { succes: true, message: "Correto e disponivel" }
}

export const verifySenha = async (password: string) => {

    if (password && typeof (password) == "string") {
        if (password.length > 8) {
            if (password.length < 30) {
                return ({ success: true, message: "correto" })
            } else {
                return ({ success: false, message: "tamanho de senha excedido" })
            }
        } else {
            return ({ success: false, message: "tamanho da senha é insuficiente" })
        }
    } else {
        return ({ success: false, message: "senha inválida" })
    }
}

export const update = async (data: usuarioDTO) => {
    await getById(data.id);

    const updateData: any = { data_modificacao: new Date() };
    if (data.usuario !== undefined) updateData.usuario = data.usuario;
    if (data.texto_bio !== undefined) updateData.texto_bio = data.texto_bio;
    if (data.avatar_url !== undefined) updateData.avatar_url = data.avatar_url;

    const res = await Usuario.update(updateData, {
        where: { id: data.id },
    });

    return res;
};


export const deleteUser = async (id: any) => {

    await getById(id)

    const resp = await Usuario.destroy({ where: { id: id } })

    return resp
}


export const createUserWithDefaults = async (data: any) => {
    return await sequelize.transaction(async (t: any) => {

        const user = await Usuario.create(
            { ...data, data_criacao: new Date() },
            { transaction: t }
        );

        const url = await Url.create(
            {
                usuario_id: user.id,
                url_xbox: null,
                url_psn: null,
                url_steam: null,
                url_nintendo: null,
                url_twitch: null,
                url_retro: null,
                data_criacao: new Date(),
            },
            { transaction: t }
        );

        const favorite = await Favorite.create(
            {
                usuario_id: user.id,
                data_criacao: new Date(),
            },
            { transaction: t }
        );

        return {
            userId: user.id,
            urlId: url.id,
            favoriteId: favorite.id,
        };
    });
};


// export const getUsersByFilter = async (data: usu) => {

//     if (!data.pagina || !data.tamanhoPagina) {
//         throw new Error("Dados de paginação obrigatórios")
//     }

//     const users = await Usuario.findAll(
//         {
//             where: {
//                 [Op.or]: [
//                     { nome: { [Op.iLike]: `%${data.search}%` } },
//                     { username: { [Op.iLike]: `%${data.search}%` } }
//                 ]
//             },
//             attributes: ["id", "nome", "username", "img_url", [
//                 Sequelize.literal(`(Select count(*) From seguidor where following_id = "Usuario".id)`), "seguidores"
//             ]],
//             limit: data.tamanhoPagina,
//             offset: (data.pagina - 1) * data.tamanhoPagina,
//             order: [[Sequelize.literal("seguidores"), "DESC"]]
//         },

//     )

//     return users

// }