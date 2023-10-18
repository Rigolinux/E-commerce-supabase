import { ref } from 'vue';

import {useUser} from './useUser';
import {InsertData, UpdateData} from '@/vueutils/UseTables';


export const UsePayment = () => {

    const comp = useUser();

    const user: any | User = ref({});
    
    const ProccessPayment = async (params: any) => {

        try{
            
            console.log(params)
            await comp.GetUser();

            user.value = comp.User.value;

            let cart = JSON.parse(localStorage.getItem('product-cart') || '{}');

            console.log(cart)

            //update cart with user data
            

            let refernces;

            if(params.type === 'Wompy'){
                refernces = {
                    identificadorEnlaceComercio:  params.identificadorEnlaceComercio , 
                    idTransaccion: params.idTransaccion,
                    hash: params.hash,
                }
                refernces = JSON.stringify(refernces);
            }
            else if (params.type === 'Paypal'){
                refernces = params.referencia;
            }

            const salesheader: SalesHeader = {
                id_perfil: user.value.id_perfil,
                total: params.monto,
                descuento: 0,
                metodo_de_pago: params.type,
                estado: 'Procesada',
                referencia: refernces

            }; 

            
             const data = await InsertData(salesheader, 'ventas');
            
            if(data === undefined) throw new Error('Error al procesar la compra');

            const purcharseHDB:SalesHeader = data[0];

            const salesDetail: SalesDetail[] = [];

            cart.forEach((item: ProductCartView) => {
                const newObj: SalesDetail = {
                    id_ventas: purcharseHDB.id_ventas,
                    id_productos: item.id_producto,
                    nombre: item.nombre,
                    precio_producto: item.precio_unitario,
                    cantidad: item.cantidad,
                    descuento: item.descuento,
                    total: item.valor_total_precio
                
                };

                salesDetail.push(newObj);
            });

            //!aqui descontar promedio de stock
            cart = cart.map ((item: ProductCartView) => {
                item.stock = item.stock - item.cantidad;


                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const  { cantidad, ...Newtem } = item;
                return Newtem;
            });

            const promises: any[] = [];

            salesDetail.forEach((item: SalesDetail) => {
                promises.push(InsertData(item, 'detalle_venta'));
            });

            cart.forEach((item: ProductCartView) => {
                promises.push(UpdateData(item,'productos',item.id_producto, 'id_producto' ));
            });

            await Promise.all(promises);

            console.log('transaccion exitosa');
            return true; 

           /* 
            const promises = cart.map(async (item: ProductCartView) => {
                return UpdateData(item,'productos',item.id_producto, 'id_producto', );
            });

            console.log(promises) */
            
        
        
        }
        catch(error: any){
            alert(error.message)
            return false;
        }
    };

    // invoice details
    

    // get axios request 

    // methods of payment

    // procees the order and save it in the database

    // get user data from the database

    return {
        ProccessPayment
    }
}






