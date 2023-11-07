/* eslint-disable @typescript-eslint/no-unused-vars */
declare interface Credentials {
    email?: string | undefined
    password?: string | undefined
    provider?: 'bitbucket' | 'github' | 'gitlab' | 'google' | undefined
}

declare interface UserStore {
    user: object | null,
    role: string | null
}

// declare interface ProductCart {
//     id_producto:            number;
//     id_categoria:           number;
//     nombre:                 string;
//     marca:                  string;
//     stock:                  number;
//     valor_total_precio:     number;
//     precio_unitario:        number;
//     costo:                  number;
//     costo_unitario:         number;
//     descripcion:            string;
//     descuento:              number;
//     estado:                 string;
//     imagen:                 string;
//     cantidad:               number;
// }

declare interface SalesHeader {
    id_ventas?:             number;
    total:                 number;
    descuento:             number;
    id_perfil?:            number;
    fecha_de_compra?:      string;
    metodo_de_pago:        string;
    estado:                string;
    referencia:            string;
}


declare interface SalesDetail {
    id_detalle_ventas?:    number;
    id_ventas?:            number;
    cantidad?:             number;
    id_productos?:         number;
    nombre:                string;
    precio_producto?:      number;
    descuento?:            number;
    total?:                number;
}

declare interface User {
    id_perfil?:             number;
    foto_de_perfil?:        string;
    nombre?:                string;
    apellido?:              string;
    email?:                 string;
    fecha_de_nacimiento?:    string;
    sexo?:                   string;
    no_dui?:                 number;
    direccion?:              string;
    telefono?:                number;

}

declare interface ProductCartView {
    id_producto:            number;
    id_categoria:           number;
    nombre:                 string;
    marca:                  string;
    stock:                  number;
    valor_total_precio:     number;
    precio_unitario:        number;
    costo:                  number;
    costo_unitario:         number;
    descripcion:            string;
    descuento:              number;
    estado:                 string;
    imagen:                 string;
    cantidad:               number;
}

// Nuevas interfaces agregadas

// Interfaz para la vista productsView, productDetail
declare interface Product {
    id_producto:            number;
    id_categoria:           number;
    nombre:                 string;
    marca:                  string;
    stock:                  number;
    valor_total_precio:     number;
    precio_unitario:        number;
    costo:                  number;
    valor_stock_promedio:   number;
    descripcion:            string;
    descuento:              number;
    estado:                 boolean;
    imagen:                 string;
    cantidad?:              number;
}
// Interfaz para la vista addProduct y updateProduct
declare interface AddProductAndUpdate {
    id_producto?:           number;
    id_categoria:           number;
    nombre:                 string;
    marca:                  string;
    stock:                  number;
    valor_total_precio:     number;
    precio_unitario:        number;
    costo:                  number;
    valor_stock_promedio:   number;
    descripcion:            string;
    descuento:              number;
    estado:                 boolean;
    imagen:                 string;
    // cantidad?:              number;
}

// Interfaz para la vista categoriesView, categoryDetail
declare interface Categories {
    id_categoria:           number;
    nombre:                 string;
    descripcion:            string;
    imagen:                 string;
}

// Interfaz para la vista addCategory y updateCategory
declare interface AddCategoryAndUpdate {
    id_categoria?:          number;
    nombre:                 string;
    descripcion:            string;
    imagen:                 string;
}

declare interface ZZZ {
    id_categoria:           number | undefined | null;
    nombre:                 string;
    descripcion:            string;
    imagen:                 string;
}

declare interface ProductCart {
    id_productos?:         number;
    id_producto:            number;
    id_categoria:           number;
    nombre:                 string;
    marca:                  string;
    stock:                  number;
    valor_total_precio:     number;
    precio_unitario:        number;
    costo:                  number;
    valor_stock_promedio:   number;
    descripcion:            string;
    descuento:              number;
    estado:                 boolean;
    imagen:                 string;
    cantidad?:              number;
}
