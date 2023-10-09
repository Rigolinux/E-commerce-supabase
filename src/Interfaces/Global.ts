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

declare interface ProductCart {
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

declare interface SalesHeader {
    id_ventas?:             number;
    id?:                   number;
    total:                 number;
    descuento:             number;
    id_perfil?:            number;
    direccion:             string;
    telefono:              string;
    estado:                string;
    referencia:            string;
    fecha_de_compra?:      string;
    metodo_de_pago:        string;
}

declare interface User {
    id_perfil?:             number;
    foto_de_perfil?:        string;
    nombre?:                string;
    apellido?:              string;
    email?:                 string;
    fecha_de_nacimiento?:    Date;
    sexo?:                   string;
    no_dui?:                 number;
    direccion?:              string;
}