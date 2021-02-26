export class Helados{

    constructor(
        public titulo: string,
        public descripcion: string,
        public imagenes: [string],
        public precio: number,
        public oferta: boolean,
        public combo: boolean,
    ){}
}