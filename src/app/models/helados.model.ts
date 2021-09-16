export class Helados{

    constructor(
        public titulo: string,
        public tipo: string,
        public descripcion: string,
        public id: string,
        public imagenes: [string],
        public sabores: [string],
        public precio: number,
        public oferta: boolean,
        public combo: boolean,
    ){}
}
