import { url } from "../types/urlT";

const { Usuario, Url } = require("../models");

const validate = async (data: url) => {

    var erros: string[] = []

    if (!data.usuario_id) {
        erros.push("usuario obrigatório")
    } else {
        const resp = await Usuario.findOne({ where: { id: data.usuario_id } })
        if (!resp) {
            erros.push("usuario não existente")
        }
    }

    if (erros.length > 0) throw new Error(erros.toString())
}

export const createUrl = async (data: url) => {
    await validate(data);

    const url = await Url.create({
        usuario_id: data.usuario_id,
        url_xbox: data.url_xbox ?? null,
        url_psn: data.url_psn ?? null,
        url_steam: data.url_steam ?? null,
        url_nintendo: data.url_nintendo ?? null,
        url_twitch: data.url_twitch ?? null,
        url_retro: data.url_retro ?? null,
        data_criacao: new Date()
    });

    return url.id;
};

export const getById = async (id: number) => {
    const resp = await Url.findByPk(id)

    if (!resp)
        throw new Error("Não encontrado")

    return resp
}


export const getByUserId = async (id: number) => {
    const resp = await Url.findOne({ where: { usuario_id: id } })

    if (!resp)
        throw new Error("Não encontrado")

    return resp
}

export const updateUrl = async (data: Partial<url> & { id: number }) => {
    const res = await Url.update(
        {
            ...(data.url_xbox !== undefined && { url_xbox: data.url_xbox }),
            ...(data.url_psn !== undefined && { url_psn: data.url_psn }),
            ...(data.url_steam !== undefined && { url_steam: data.url_steam }),
            ...(data.url_nintendo !== undefined && { url_nintendo: data.url_nintendo }),
            ...(data.url_twitch !== undefined && { url_twitch: data.url_twitch }),
            ...(data.url_retro !== undefined && { url_retro: data.url_retro }),
            data_modificacao: new Date(),
        },
        {
            where: { id: data.id },
        }
    );

    return res;
};


export const deleteUrl = async (id: number) => {
    const url = await getById(id);

    const del = Url.destroy({ where: { id: url.id } })

    return del
}