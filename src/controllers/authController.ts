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


        const { accessToken, refreshToken } = generateTokens(resp);

        res.cookie("rfssid", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/",
            maxAge: 2 * 24 * 60 * 60 * 1000
        });


        return res.status(200).json({ success: true, usuario_id: resp.id, dados: { message: "Login realizado!", token: accessToken } })

    } catch (error: any) {
        return res.status(401).json({ success: false, error: error.message })
    }
}


//checa o token de acesso e retorna o Id do usuario
export const checkLogin = async (req: any, res: any) => {
    const accessToken = req.headers["authorization"];
    const refreshToken = req.cookies.rfssid;

    console.log({ accessToken, refreshToken })

    if (!accessToken || !refreshToken) {
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
    const hmac = req.headers["hmac"];
    const fingerPrint = req.cookies.riptn;
    const ssid = req.cookies.rfssid
    const token = authHeader.split(' ')[1];

    try {

        const decodedRefresh = jwt.verify(ssid, process.env.REFRESH_SECRET as string);
        const decodedAccess = jwt.verify(token, process.env.ACCESS_SECRET as string);

        if (typeof decodedRefresh !== "object" || !decodedRefresh.id || typeof decodedAccess !== "object" || !decodedAccess.id) {
            return res.status(403).json({ error: "token inválido." });
        }

        res.cookie("rfssid", "", {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            // domain: "localhost",
            path: "/",
            maxAge: -1,
            expires: -1
        })

        res.cookie("seddra", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // domain: "localhost",
            path: "/",
            maxAge: -1
        })

        res.cookie("riptn", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // domain: "localhost",
            path: "/",
            maxAge: -1
        })

        return res.status(200).json({ success: true, message: "Logout realizado!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}


export const authenticate = async (req: any, res: any, next: any) => {
    const refreshToken = req.cookies.rfssid;
    const hmac = req.headers["hmac"];
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

            if (!refreshToken) {
                return res.status(401).json({ error: "Token expirado e nenhum refresh token foi fornecido" });
            }

            console.log("---------------------passou de refresh 1--------------")

            try {

                console.log("---------------------passou de sessão 1--------------")

                console.log("---------------------passou de sessão x hmac--------------")

                const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string);

                if (typeof decodedRefresh !== "object" || !decodedRefresh.id) {
                    return res.status(401).json({ error: "Refresh token inválido." });
                }

                console.log("---------------------passou de decoded --------------")

                const { accessToken } = generateTokens({ id: decodedRefresh.id });

                console.log("---------------------gerou outro token--------------")

                res.setHeader("Authorization", `Bearer ${accessToken}`);

                req.headers["authorization"] = `Bearer ${accessToken}`;

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