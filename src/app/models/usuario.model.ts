export class Usuarios{

    constructor(
        public nombre: string,
        public apellido: string,
        public direccion: string,
        public email: string,
        public idToken: string,
        public telefono: number,
        public google: boolean
    ){}
}
