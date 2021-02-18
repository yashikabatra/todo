import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "../index.css";
import { Modal } from "antd";
import axios from "axios";

class TaskMeta extends Component {
  state = {
    new_link_name_modal: false,
    visible: false,
    confirmLoading: false,
    modalText: "Content of the modal",
  };

  changeHandler = (e) => {
    this.setState({ meta_name_to_be_added: e.target.value });
  };
  render() {
    console.log(this.props.currentTaskname);
    var taskmeta_tobe_displayed = [];
    for (var i of this.props.data) {
      for (var j of i.tasks) {
        if (j.text == this.props.currentTaskname) {
          taskmeta_tobe_displayed = j.meta;
        }
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
        text: this.state.meta_name_to_be_added,
        time: Date.now(),
        list_id: this.props.currentListId,
        task_id: this.props.currentTaskId,
      };
      // setTimeout(() => {
      //   setVisible(false);
      //   setConfirmLoading(false);
      // }, 2000);
      axios
        .post("http://localhost:3000/api/todo/task_meta", body, {
          headers: headers,
        })
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
        {taskmeta_tobe_displayed.map((c) => (
          <div>
            <Button> {c.text} </Button>{" "}
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
          title='ADD META'
          visible={this.state.visible}
          onOk={handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={handleCancel}
        >
          <form>
            <label>META</label>
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

export default TaskMeta;
