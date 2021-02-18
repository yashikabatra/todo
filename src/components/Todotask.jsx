import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "../index.css";
import { Modal } from "antd";
import axios from "axios";

class Tasks extends Component {
    state = {
        new_link_name_modal: false,
        visible: false,
        confirmLoading: false,
        modalText: "Content of the modal",
      };
  changeHandler = (e) => {
    this.setState({ task_name_to_be_added: e.target.value });
  };
  render() {
    var todo_task_to_be_displayed = [];

    for (var i of this.props.data) {
      if (i.name == this.props.currentListname) {
        var todo_task_to_be_displayed = i.tasks;
        console.log(todo_task_to_be_displayed);
      }
    }


    const setVisible = (visible_val) => {
      this.setState({ visible: visible_val });
    };

    const setConfirmLoading = (confirm_val) => {
      this.setState({ confirmLoading: confirm_val });
    };

    const setModalText = (modal_text) => {
      this.setState({ modalText: modal_text });
    };

    const showModal = () => {
      setVisible(true);
    };

    const handleOk = () => {
      setModalText("The modal will be closed after two seconds");
      setConfirmLoading(true);
      const headers = {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE3YWY3NTkwMGRjYjc4OWMyOWIyMzMiLCJpYXQiOjE2MTIxNjUxMTF9.uUehGfW1PXkEzfOfNYE9OCrKNtx3akxa2v5QVhQXe_M",
        "Content-Type": "application/json",
      };
      const body = {
        text: this.state.task_name_to_be_added,
        time: Date.now(),
        list_id:this.props.currentListId,
        status: "pending"
      };
      // setTimeout(() => {
      //   setVisible(false);
      //   setConfirmLoading(false);
      // }, 2000);
      
      axios
        .post("http://localhost:3000/api/todo/task", body, { headers: headers })
        .then((response) => {
          console.log(response);
          setVisible(false);
          setConfirmLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleCancel = () => {
      console.log("Clicked cancel button");
      setVisible(false);
    };
    return (
      <div>
        {todo_task_to_be_displayed.map((c) => (
          <div>
            {/* <button onClick={()=>this.props.onTodoSelect(c.Task)}> {c.Task}  </button>  */}

            {this.props.currentTaskname == c.text ? (
              <Button
                type='primary'
                block
                onClick={() => this.props.onTodoSelect(c.text, c._id)}
              >
                {c.text}
              </Button>
            ) : (
              <Button
                block
                onClick={() => this.props.onTodoSelect(c.text, c._id)}
              >
                {c.text}
              </Button>
            )}
          </div>
        ))}
        <Button
          block
          onClick={() => this.setState({ new_link_name_modal: true })}
          onClick={showModal}
        >
          <PlusCircleOutlined />
        </Button>
        <Modal
          title='ADD TASK'
          visible={this.state.visible}
          onOk={handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={handleCancel}
        >
          <form>
            <label>TASKNAME</label>
            <input
              type='text'
              class='form-control'
              onChange={this.changeHandler}
            ></input>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Tasks;
