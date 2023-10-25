import { GetData } from "@/vueutils/UseTables";
import { ref } from "vue"


export const useInvoices = () => {

    const InvoicesHeaders = ref<SalesHeader[]>([]);

    const InvoicesDetails = ref<ProductCart[]>([]);
    
    const Users = ref<any[]>([]);

    const Categories = ref<any[]>([]);

    const Saleschart = ref<any[]>([]);

    async function GetInvoicesData() {
        try {
            const dataDet: ProductCart[]  = await GetData('detalle_venta') || [];
            const dataHead: SalesHeader[]  = await GetData('ventas') as SalesHeader[] || [];
            const dataUsers: any[]  = await GetData('perfiles') || [];
            const dataCategories: any[]  = await GetData('categorias') || [];

            InvoicesHeaders.value = dataHead;
            InvoicesDetails.value = dataDet;
            Categories.value = dataCategories;
            Users.value = dataUsers;
            Saleschart.value =  topSales();
        } catch (error: any) {
            alert(error.message);
        }
    }
    const topSales = () => {
        const products: any[] = [];
      
        const data = InvoicesDetails.value;
        data.forEach((product) => {
          const index = products.findIndex((item) => item.id_productos === product.id_productos);
          if (index === -1) {
            products.push({
              id_productos: product.id_productos,
              nombre: product.nombre,
              cantidad: product.cantidad,
            });
          } else {
            products[index].cantidad += product.cantidad;
          }
        });
      
        // Sort the products by quantity in descending order
        products.sort((a, b) => b.cantidad - a.cantidad);
      
        // Get the top 10 products by quantity
        const topProducts = products.slice(0, 10);
      
        // Map the products to the format required by the sales chart
        const chartData = topProducts.map((product) => ({
            arg: product.nombre,
            val: product.cantidad,
        }));
      
        return chartData;
      };



    return {
        // Variables
        InvoicesHeaders,
        InvoicesDetails,
        Users,
        Categories,

        // Charts
        Saleschart,

        // Methods
        GetInvoicesData,

    }
}