import {GetData} from './UseTables';


async function GetProducts() {
  return await GetData('productos')
}


export { GetProducts }