import { ref } from 'vue';
import { GetDataByParameter,InsertData, UpdateData } from "@/vueutils/UseTables";

export const useUser = () => {

    const User = ref<User>({
        id_perfil: 0,
        foto_de_perfil: '',
        nombre: '',
        apellido: '',
        email: '',
        fecha_de_nacimiento: new Date(),
        sexo: '',
        no_dui: 0,
        direccion: ''
      });

    const GetUser = async (mail:string) => {
        try {
            const data: any[] | undefined = await GetDataByParameter('perfiles','email',mail) ;
            if (data && data.length > 0) {
                User.value = data[0] as User;
            } else {
                throw new Error('User not found');
            }
        } catch (error: any) {
            alert(error.message);
        }
    };

    const InsertUser = async (user: User) => {
        try {
            const data = await InsertData( {
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                fecha_de_nacimiento: user.fecha_de_nacimiento,
                sexo: user.sexo,
                no_dui: user.no_dui,
                foto_de_perfil: user.foto_de_perfil,
                direccion: user.direccion,

            },'perfiles')
            
            return data
        } catch (error: any) {
            alert(error.message)
        }
    };

    const UpdateUser = async (user: User) => {
        try {

            if (!user.id_perfil) {
                throw new Error('User not found');
            }
            const data = await UpdateData( {
                nombre: user.nombre,
                apellido: user.apellido,
                fecha_de_nacimiento: user.fecha_de_nacimiento,
                sexo: user.sexo,
                no_dui: user.no_dui,
                foto_de_perfil: user.foto_de_perfil,
                direccion: user.direccion,

            },'perfiles',user.id_perfil)
            
            return data
        } catch (error: any) {
            alert(error.message)
        }
    };

    return {
        // Variables
        User,

        // Methods
        GetUser,
        InsertUser,
        UpdateUser,
    }
}


export default useUser;