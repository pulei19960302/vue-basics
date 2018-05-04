import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import user from './modules/user'
import actions from './actions'
import getters from './getters'
import mutations from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user
    },
    state,
    actions,
    getters,
    mutations
})