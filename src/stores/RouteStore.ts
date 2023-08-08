import { defineStore } from "pinia";





export const useRouteStore = defineStore({
    id: "CurrentRoute",
    state: ():any => {
        return {
            removeNav: false,
        }
    }
    ,

    actions: {
        async setRemoveNav(value: boolean) {
            this.removeNav = value
        }
    }
});