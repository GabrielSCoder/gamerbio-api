import axios from "axios";

type resType = {
    status: (code: number) => any;
    json: (data: any) => void;
    cookie: any;
};

export const searchGame = async (
    req: { params: { game: string } },
    res: resType
) => {
    try {
        const { game } = req.params;

        const response = await axios.get("https://www.giantbomb.com/api/search/", {
            params: {
                api_key: process.env.API_TOKEN,
                format: "json",
                query: game,
                resources: "game",
            },
        });

        const resp = response.data.results.map((game: any) => ({
            name: game.name,
            image_url: game.image?.thumb_url || null,
        }));

        return res.status(200).json({
            success: true,
            dados: resp,
        });
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return res.status(500).json({
                success: false,
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }

        return res.status(500).json({
            success: false,
            message: error?.message || "Erro desconhecido",
        });
    }
};
