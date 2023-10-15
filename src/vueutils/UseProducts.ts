import { GetData } from './UseTablesProducts';


async function GetProducts() {
  return await GetData('productos')
}


export { GetProducts }