import React from 'react';
import Modal from './modal.jsx';

const hierapi = 'http://localhost:5000/api/hierarchy/';
const delapi = 'http://localhost:5000/api/delete/';
const insapi = 'http://localhost:5000/api/insert/';

class Tree extends React.Component {

constructor(props) {
    super(props)
    this.state = {
        nodes: [],
        isOpen:false,
        newname:"newNode"
    };
    this.clicked = this.clicked.bind(this);
    this.deletenode = this.deletenode.bind(this);
    this.insertnew = this.insertnew.bind(this);
}

componentDidMount = () => {
    fetch(hierapi)
    .then(response => response.json())
    .then(data => {
    this.setState({nodes: data.hierarchy});
    })
}

deletenode = (e) => {
    e.preventDefault()
    let nodeid = e.currentTarget.getAttribute("nodeid")
    fetch(delapi + nodeid)
    .then(response => response.json())
    .then(data => {
        this.setState({nodes: data.hierarchy})
    }).catch( e =>
        console.log(e)
    )
}

clicked = (e) => {
    e.preventDefault()
    let nodeid = e.currentTarget.getAttribute("nodeid")
    this.setState({nodeid :nodeid})
    this.toggleModal()
}

insertnew = (nodeid, newname) => {
    console.log('newname', nodeid, newname)
    fetch(insapi + nodeid + '/' + newname)
    .then(response => response.json())
    .then(data => {
        this.setState({nodes: data.hierarchy})
        this.toggleModal()
    }).catch( e =>
        console.log(e)
    )
}

toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


    render = () => {
        return(
        <div className="">
            <div className="tree">
            {this.state.nodes.map((nodeObj) => {
                let classname = "indent"
                let indent = {marginLeft : (nodeObj.gen * 25) + 'px', marginTop:"10px"}
                return (
                    <div key={nodeObj.nodeID} 
                            className={classname} 
                            style={indent}
                            nodeid={nodeObj.nodeID}>
                        <a className="actions add" 
                            href="#add" nodeid={nodeObj.nodeID} 
                            onClick={this.clicked} 
                            aria-label="Add child node">+</a>
                        <a className="actions times" 
                            href="#delete" 
                            nodeid={nodeObj.nodeID} 
                            onClick={this.deletenode} aria-label="Delete this node">&times;</a>
                    <p className="nodetext">{nodeObj.text}</p>
                    </div>
                );
            })
            }
            </div>
            <div>
                <Modal show={this.state.isOpen}
                    onClose={this.toggleModal}
                    nodeid={this.state.nodeid}
                    insertnew={this.insertnew}/>
            </div>
        </div>
        )
    }
}

export default Tree;