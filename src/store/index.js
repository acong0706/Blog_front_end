import { createStore } from 'vuex';
import user from "@/store/modules/user";
import article from "@/store/modules/article";
import access from "@/store/modules/access";

export default createStore({
    modules: {
        user,
        article,
        access,
    }
})