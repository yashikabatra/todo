import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactModal from "react-modal";
import style from "../styles/listmenu.module.css";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "../index.css";
import { Modal } from "antd";
import axios from "axios";

class ListMenu extends Component {
  state = {
    new_link_name_modal: false,
    visible: false,
    confirmLoading: false,
    modalText: "Content of the modal",
  };

  changeHandler = (e) => {
    this.setState({ list_name_to_be_added: e.target.value });
  };

  render() {
    const { list_names } = this.props;

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
        name: this.state.list_name_to_be_added,
        time: Date.now(),
      };
      // setTimeout(() => {
      //   setVisible(false);
      //   setConfirmLoading(false);
      // }, 2000);
      axios
        .post("http://localhost:3000/api/todo/list", body, { headers: headers })
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
        {list_names.map((
          c //list_names has data  ..app.js
        ) => (
          <div>
            {this.props.currentListname == c.name ? (
              <Button
                type='primary'
                block
                onClick={() => this.props.onItemSelect(c.name, c._id)}
              >
                {c.name}
              </Button>
            ) : (
              <Button
                block
                onClick={() => this.props.onItemSelect(c.name, c._id)}
              >
                {c.name}
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
          title='ADD LIST'
          visible={this.state.visible}
          onOk={handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={handleCancel}
        >
          <form>
            <label>LISTNAME</label>
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

export default ListMenu;
