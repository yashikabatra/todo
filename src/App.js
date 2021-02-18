import React, { Component } from "react";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './App.css';
import ListMenu from "./components/list_menu";
import gettodo from "./json/todojson";
import Tasks from "./components/Todotask";
import TaskMeta from "./components/Tasksmeta";
import { Card, Col, Row } from 'antd';
import axios from "axios";

class App extends Component {
  state = {
    data: [], //currentlistname n currenttodotask removed
  };

  componentDidMount(){
    const headers = {
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE3YWY3NTkwMGRjYjc4OWMyOWIyMzMiLCJpYXQiOjE2MTIxNjUxMTF9.uUehGfW1PXkEzfOfNYE9OCrKNtx3akxa2v5QVhQXe_M",
      "Content-Type": "application/json",
    };
    axios
      .get("http://localhost:3000/api/todo/all_todo_data", { headers: headers })
      .then((response) => {
        console.log(response.data.tasks_list)
        this.setState({data: response.data.tasks_list})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleListSelect = (list_name_clicked, list_id_clicked) => {
    if (list_name_clicked != this.state.currentListname) {
      this.setState({
        currentListname: list_name_clicked,
        currentListId: list_id_clicked,
        currentTaskname: null,
      });
    }
  };

  handleTodoSelect = (task,taskId) => {
    this.setState({ currentTaskname: task , currentTaskId: taskId});
  };

  render() {
    return (
  //     <React.Fragment>
  //       <div className='row'>
  //         <div className='col-4'>
  //           <h1>LISTS</h1>
  //           <ListMenu
  //             list_names={this.state.data}
  //             onItemSelect={this.handleListSelect}
  //             currentListname={this.state.currentListname}
  //           ></ListMenu>
  //         </div>
  //         <div className='col-4'>
  //           <h1>TASKS</h1>
  //           <Tasks
  //             data={this.state.data}
  //             onTodoSelect={this.handleTodoSelect}
  //             currentListname={this.state.currentListname}
  //           ></Tasks>
  //         </div>
  //         <div className='col'>
  //           <h1>META</h1>
  //           <TaskMeta
  //             data={this.state.data}
  //             currentTaskname={this.state.currentTaskname}
  //           ></TaskMeta>
  //         </div>
  //       </div>
  //     </React.Fragment>    
  //   )
  // }}

<React.Fragment>
      <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="LISTS" bordered={false}>
            <ListMenu
              list_names={this.state.data}
              onItemSelect={this.handleListSelect}
               currentListname={this.state.currentListname}
            ></ListMenu>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="TASKS" bordered={false}>
        <Tasks
               data={this.state.data}
               onTodoSelect={this.handleTodoSelect}
               currentListname={this.state.currentListname}
               currentTaskname={this.state.currentTaskname}
               currentListId={this.state.currentListId}
             ></Tasks>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="META" bordered={false}>
        <TaskMeta
               data={this.state.data}
               currentTaskname={this.state.currentTaskname}
               currentListId={this.state.currentListId}
               currentTaskId={this.state.currentTaskId}

             ></TaskMeta>
        </Card>
      </Col>
    </Row>
  </div>,
  {/* mountNode, */}
  </React.Fragment>
    )
  }
}
export default App;
