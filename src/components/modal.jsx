import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
constructor(props) {
    super(props)
    this.state = {nodeid:"rootNode", newname:""};
    this.addnew = this.addnew.bind(this);
    this.handlechange = this.handlechange.bind(this);
}

addnew = (e) => {
    e.preventDefault()
    let nodeid = this.props.nodeid
    let newname = this.state.newname
    if(newname === "Easter Egg") {
        window.location = "/bouncy.html"
        return
    }else if(newname === "") {
        return
    }
    this.setState({newname:""})
    this.props.insertnew(nodeid, newname)
}

  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop" >
        <div className="modal" >
          {this.props.children}
          <h2>Name your new node</h2>
          <form>
            <input id="newname" 
                    type="text" 
                    value={this.state.newname}
                    onChange={e => this.handlechange(e)}
                    autoFocus/>
            <div className="footer">
                <button type="submit" onClick={this.addnew}>
                Add
                </button>
                <button onClick={this.props.onClose}>
                Cancel
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  handlechange = (e) => {
      this.setState({
          newname: e.target.value
      })
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;