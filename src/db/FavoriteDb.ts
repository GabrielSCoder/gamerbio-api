import { favoriteDTO } from "../types/favoriteT";

const { Favorite } = require("../models");


export const validateFavorite = (data: favoriteDTO) => {
    if (!data.usuario_id) {
        throw new Error("Usuário é obrigatório");
    }

    const urlFields = [
        data.primeiro_jogo_url,
        data.segundo_jogo_url,
        data.terceiro_jogo_url,
        data.quarto_jogo_url,
        data.quinto_jogo_url,
    ];

    urlFields.forEach((url) => {
        if (url && typeof url !== "string") {
            throw new Error("URLs devem ser texto");
        }
    });

};

export const createFavorite = async (data: favoriteDTO) => {
    validateFavorite(data);
    const favorite = await Favorite.create({
        ...data,
        data_criacao: new Date(),
    });
    return favorite.id;
};

export const getFavoriteByUser = async (usuario_id: number) => {
    const favorite = await Favorite.findOne({ where: { usuario_id } });
    if (!favorite) {
        throw new Error("Favoritos não encontrados");
    }
    return favorite;
};

export const updateFavorite = async (data: favoriteDTO) => {
    validateFavorite(data);

    const res = await Favorite.update(
        {
            primeiro_jogo_titulo: data.primeiro_jogo_titulo,
            primeiro_jogo_url: data.primeiro_jogo_url,
            segundo_jogo_titulo: data.segundo_jogo_titulo,
            segundo_jogo_url: data.segundo_jogo_url,
            terceiro_jogo_titulo: data.terceiro_jogo_titulo,
            terceiro_jogo_url: data.terceiro_jogo_url,
            quarto_jogo_titulo: data.quarto_jogo_titulo,
            quarto_jogo_url: data.quarto_jogo_url,
            quinto_jogo_titulo: data.quinto_jogo_titulo,
            quinto_jogo_url: data.quinto_jogo_url,
            data_modificacao: new Date(),
        },
        { where: { id: data.id } }
    );

    return res;
};

export const deleteFavorite = async (id: number) => {
    const res = await Favorite.destroy({ where: { id } });
    return res;
};


