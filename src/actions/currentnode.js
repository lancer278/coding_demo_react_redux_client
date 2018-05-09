const SET_NODE = 'SET_NODE'

export default function currentnode(id) {
  return {
    type: SET_NODE,
    id
  }
}

