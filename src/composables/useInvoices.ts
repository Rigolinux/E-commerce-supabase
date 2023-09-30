import { GetData } from "@/vueutils/UseTables";
import { ref } from "vue"


export const useInvoices = () => {

    const InvoicesHeaders = ref<SalesHeader[]>([]);

    const InvoicesDetails = ref<ProductCart[]>([]);
    
    const Users = ref<any[]>([]);

    const Categories = ref<any[]>([]);

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
        } catch (error: any) {
            alert(error.message);
        }
    }




    return {
        // Variables
        InvoicesHeaders,
        InvoicesDetails,
        Users,
        Categories,

        // Methods
        GetInvoicesData,

    }
}