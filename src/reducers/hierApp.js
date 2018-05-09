import SET_NODE from '../actions/currentnode.js'

const init = {nodeid : "rootNode"}

function getcurrentnode(state = init, action){

    switch(action.type){
        case SET_NODE:
        return Object.assign({},state,{
            nodeid : action.id
        })
    default:    
        return state
    }
}

export default getcurrentnode