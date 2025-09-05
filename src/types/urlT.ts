import { baseT } from "./baseT"

export type url = {
    usuario_id: number;
    url_xbox?: string | null;
    url_psn?: string | null;
    url_steam?: string | null;
    url_nintendo?: string | null;
    url_twitch?: string | null;
    url_retro?: string | null;
} & baseT;