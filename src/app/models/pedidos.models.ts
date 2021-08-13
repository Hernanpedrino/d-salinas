export class Pedidos{
    constructor(
        public cantidad: number,
        public descripcion: string,
        public precio: number,
        public sabor: string
    ){}
}
//     arreglo de pedidos:
//     pedidos[
//         {
//             items[
//                 {
//                     cantidad: number,
//                     descripcion: string,
//                     precio: number,
//                     sabor: string
//                 }
//             ]
//         }
//     ]
//     asi tiene que grabarse en bd


