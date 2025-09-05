import { createFavorite, deleteFavorite, getFavoriteByUser, updateFavorite } from "../db/FavoriteDb"

type resType = {
    status: (code: number) => any;
    json: (data: any) => void
}

export const postAsync = async (req: { body: any }, res: resType) => {
    try {
        const resp = await createFavorite(req.body)
        return res.status(200).json({ success: true, dados: resp })
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const updateAsync = async (req: { body: any }, res: resType) => {
    try {
        const resp = await updateFavorite(req.body)
        return res.status(200).json({ success: true, dados: resp })
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const deleteAsync = async (req: { params: { id: number } }, res: resType) => {
    try {
        const resp = await deleteFavorite(req.params.id)
        return res.status(200).json(resp)
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}


export const getByUser = async (req: { params: { id: number } }, res: resType) => {
    try {
        const resp = await getFavoriteByUser(req.params.id)
        return res.status(200).json({ success: true, dados: resp })
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message })
    }
}