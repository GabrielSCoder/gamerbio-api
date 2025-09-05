import { login2 } from "../db/authDb"
import jwt from "jsonwebtoken";
import { getById } from "../db/userDb";
import dotenv from "dotenv"


dotenv.config();


type resType = {
    status: (code: number) => any;
    json: (data: any) => void
    cookie: any
}

export const generateTokens = (user: { id: any; }) => {
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET as string, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET as string, { expiresIn: "5d" });

    return { accessToken, refreshToken };
};

export const login = async (req: { body: any, headers: any, cookies: any }, res: resType) => {

    try {
        const { usuario, senha } = req.body


        if (!usuario || !senha) {
            return res.status(401).json({ success: false, error: "Dados obrigatórios" })
        }


        const resp = await login2({ usuario, senha })


        const { accessToken } = generateTokens(resp);

        return res.status(200).json({ success: true, usuario_id: resp.id, dados: { message: "Login realizado!", token: accessToken } })

    } catch (error: any) {
        return res.status(401).json({ success: false, error: error.message })
    }
}


//checa o token de acesso e retorna o Id do usuario
export const checkLogin = async (req: any, res: any) => {
    const accessToken = req.headers["authorization"];

    console.log(accessToken)

    if (!accessToken) {
        return res.status(200).json({ success: false, error: "Não autorizado" });
    }

    const token = accessToken.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET as string);

        if (typeof decoded !== "object" || !decoded.id) {
            return res.status(200).json({ success: false, error: "Erro de comparação" });
        }


        const user = await getById(decoded.id);

        return res.status(200).json({ success: true, user });

    } catch (err: any) {
        return res.status(200).json({ success: false, error: "Token inválido." });
    }
};


//limpa o token refresh
export const logout = async (req: any, res: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    try {

        const decodedAccess = jwt.verify(token, process.env.ACCESS_SECRET as string);

        if (typeof decodedAccess !== "object" || !decodedAccess.id) {
            return res.status(403).json({ error: "token inválido." });
        }
        return res.status(200).json({ success: true, message: "Logout realizado!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}


export const authenticate = async (req: any, res: any, next: any) => {
    const authHeader = req.headers["authorization"];


    if (!authHeader) {
        return res.status(401).json({ error: "Token ausente" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token inválido" });
    }

    try {
        const decodedRefresh = jwt.verify(token, process.env.ACCESS_SECRET as string);

        if (decodedRefresh) {
            return next();
        }


    } catch (err: any) {
        if (err.name === "TokenExpiredError") {

            try {

                return next();
            } catch (refreshErr) {
                return res.status(401).json({ error: "Refresh token expirado. Faça login novamente." });
            }
        }

        return res.status(401).json({ error: "Token inválido." });
    }
}

export const meetAsync = async (req: any, res: any, next: any) => {
    return res.status(200).json({ success: true, dados: { ad: process.env.ACCESS_SECRET as string, ed: process.env.REFRESH_SECRET as string, bd: process.env.FRONT_URL as string } })
}