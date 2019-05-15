//Import React, Logos, Bootstrap, Custom SCSS, FlipMove and Unique Id
import React, { Component } from 'react';
import logo from './logo.svg';
import logomobile from './logomobile.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FlipMove from "react-flip-move";
import uuid from 'uuid';

//Create list of empty Array
//Create Item of blank string
//Create Id with Unique id
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: "",
      list: [],
      id: uuid()
    };
  };

//Create Add item Function
addItem() {
  //Create Item with Unique Id
  const item = {
    id: uuid(),
    value: this.state.item.slice(),
    title: this.state.item
  };

  //copy of current list of items
  const list = [...this.state.list];

  //add new item to list
  list.push(item);
  
  //update state with new list and reset item input
  this.setState({
    list,
    item: "",
  });
}

//Create Delete item Function
deleteItem(id) {
  //copy current list of items
  const list = [...this.state.list];

  //filter out item being deleted
  const updatedList = list.filter(item => item.id !== id);
  
  //Update state to updated list
  this.setState({
    list: updatedList,
  });
}

//Create Edit item Function
handleEdit(id) {
  //filter out item being edited to return array list
  const updatedList = this.state.list.filter(item => item.id !== id);
  //filter out item being edited to return single selected item
  const selectedItem = this.state.list.find(item => item.id === id);
  
  //Update state to updated list
  //Display value of edited item in input
  this.setState({
    list: updatedList,
    item: selectedItem.title,
    id: id
  });
}

  //LocalStorage
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // Add event listener to save state to localStorage
    // When user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // Saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // For all items in state
    for (let item in this.state) {
      // If the item exists in localStorage
      if (localStorage.hasOwnProperty(item)) {
        // Get the item's value from localStorage
        let title = localStorage.getItem(item);

        // Parse the localStorage string and setState
        try {
          title = JSON.parse(title);
          this.setState({ [item]: title });
        } catch (e) {
          // Handle empty string
          this.setState({ [item]: title });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // For every item in React state
    for (let item in this.state) {
      // Save to localStorage
      localStorage.setItem(item, JSON.stringify(this.state[item]));
    }
  }

  //Store in local Storage
  updateInput(item, title) {
    //update react state
    this.setState({
      [item]: title
    });
  }

render() {
  return (
    <div className="container smooth">
      {/* Logo Desktop & Mobile */}
      <img src={logo} className="App-logo header1 d-none d-xl-block d-lg-block" alt="logo" />
      <img src={logomobile} className="App-logo header1 d-xl-none d-lg-none" alt="logo" />
      <div className="header2">
        <div className="col mx-auto col-xl-10 col-lg-10 col-md-8 col-sm-12 mt-4">
          <div className="card card-body my-3">
            <div className="input-group">
              <div className="input-group-prepend"></div>
                {/* Input Field */}
                <input type="text"
                  className="form-control text-capitalize"
                  placeholder="Type task here..."
                  maxlength="20"
                  value={this.state.item}
                  onChange={e => this.updateInput("item", e.target.value)}
                />
                {/* Add Item Button */}
                <button className="btn" onClick={() => this.addItem()}>
                  Add
                </button>
              </div>
            </div>
          {/* Drop Down list of added Items */}
            <ul>
              <FlipMove duration={250} easing="ease-out" className="break-word">
              {this.state.list.map(item => {
                return (
                  <li className="list-group-item text-capitalize d-flex justify-content-between"
                    item={item.id}>
                    {item.value}
                    <div className="todo-icon">
                      {/* Edit Item */}
                      <button onClick={() => this.handleEdit(item.id)}
                      className="btn-add mx-2 text-success">
                      <i className="fas fa-pen"></i>
                      </button>
                      {/* Remove Item */}
                      <button onClick={() => this.deleteItem(item.id)}
                      className="btn-add mx-2 text-danger">
                      <i className="fas fa-trash "></i>
                      </button>
                    </div>
                  </li>
                  )
                }
              )}
              </FlipMove>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
