import { baseT } from "./baseT"

export type usuario = {
    usuario: string
    senha: string
    data_nascimento: Date
} & baseT & usuarioDTO

export type usuarioDTO = {
    usuario: string
    texto_bio: string
    avatar_url: string
} & baseT

export type game = {
    url: string
    titulo: string
}

export type usuarioLogin = {
    usuario: string
    senha: string
}

export type usuarioRegister = {
    usuario: string
    senha: string
    data_nascimento: Date
}