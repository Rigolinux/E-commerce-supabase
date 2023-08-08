import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    // Obtén el objeto router y route utilizando las funciones proporcionadas por Vue Router
    const router = useRouter();
    const route = useRoute();

    // Ahora puedes acceder a this.$router y this.$route usando router y route respectivamente
    // Por ejemplo, para obtener la ruta actual:
    const currentRoute = route;

    // Y para navegar a una ruta diferente:
    const navigateToRoute = () => {
      router.push('/ruta-destino');
    };

    return {
      currentRoute,
      navigateToRoute,
    };
  },
};

