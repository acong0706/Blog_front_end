import { createStore } from 'vuex';
import user from "@/store/modules/user";
import article from "@/store/modules/article";

export default createStore({
    modules: {
        user,
        article,
    }
})