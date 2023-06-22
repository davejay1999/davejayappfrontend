import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import "./App.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: [],
      modal: false
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("https://davejayapp-53a9fef5b0d2.herokuapp.com/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(
          `https://davejayapp-53a9fef5b0d2.herokuapp.com/api/todos/${item.id}/`,
          item
        )
        .then(res => this.refreshList())
        .catch(err => console.log(err));
      return;
    }
    axios
      .post(
        "https://davejayapp-53a9fef5b0d2.herokuapp.com/api/todos/",
        item
      )
      .then(res => this.refreshList())
      .catch(err => console.log(err));
  };
  handleDelete = item => {
    axios
      .delete(
        `https://davejayapp-53a9fef5b0d2.herokuapp.com/api/todos/${item.id}/`
      )
      .then(res => this.refreshList())
      .catch(err => console.log(err));
  };
  createItem = () => {
	const item = { title: "", description: "", completed: false };
	this.setState({ activeItem: item, modal: !this.state.modal });
};

editItem = item => {
	this.setState({ activeItem: item, modal: !this.state.modal });
};

render() {
	return (
		<main className="content">
			<h1 className="text-center my-4">Ray's Todo App</h1>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="card">
							<div className="card-header">
								<button
									onClick={this.createItem}
									className="btn btn-primary"
								>
									Add Task
								</button>
							</div>
							<div className="card-body">
								{this.renderTabList()}
								<ul className="list-group list-group-flush">
									{this.renderItems()}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			{this.state.modal ? (
				<Modal
					activeItem={this.state.activeItem}
					toggle={this.toggle}
					onSave={this.handleSubmit}
				/>
			) : null}
		</main>
	);
}
}

export default App;
