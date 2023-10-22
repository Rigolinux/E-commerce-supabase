import { GetData, GetIdAndNameCategories } from "./UseTablesCategories";

async function GetCategories() {
  return await GetData('categorias')
}

async function GetIdAndName() {
  return await GetIdAndNameCategories('categorias')
}

export {
  GetCategories,
  GetIdAndName
}
