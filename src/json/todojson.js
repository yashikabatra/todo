import axios from "axios";

const todo_old = [
  // has name and todo task
  {
    Name: "STUDY WORK",

    Todo_task: [
      {
        Task: "Study React",
        Due_Date: "20-01-2021",
        Meta: [
          { Text: "freecodecamp" },
          { Text: "Mosh" },
          { Text: "Traversy" },
        ],
      },

      {
        Task: "Make Portfolio",
        Due_Date: "22-01-2021",
        Meta: [
          { Text: "Weather App" },
          { Text: "E - commerce" },
          { Text: "Github" },
        ],
      },
    ],
  },

  {
    Name: "OFFICE WORK",

    Todo_task: [
      {
        Task: "Office App",
        Due_Date: "20-01-2021",
        Meta: [{ Text: "Api" }, { Text: "React App" }, { Text: "Office app " }],
      },

      {
        Task: "Schedule Meeting",
        Due_Date: "22-01-2021",
        Meta: [
          { Text: "Discuss Work" },
          { Text: "Discuss Salary" },
          { Text: "Discuss Growth" },
        ],
      },
    ],
  },
];

const todo = [
  {
    _id: "6017b15d900dcb789c29b234",
    name: "YashikasFirstList",
    time: 1612116028,
    tasks: [
      {
        meta: [
          {
            _id: "6017b49c900dcb789c29b236",
            text: "Slap Shivam",
            time: 1612116028,
          },
        ],
        _id: "6017b462900dcb789c29b235",
        text: "yashikafirstlisttask",
        status: "Pending",
        time: 1612116028,
      },
    ],
  },
  {
    _id: "6017b67f900dcb789c29b238",
    name: "ybfirstlist",
    time: 1612116028,
    tasks: [
      {
        meta: [
          {
            _id: "6017b77f900dcb789c29b23a",
            text: "ybmeta1",
            time: 1612116028,
          },
        ],
        _id: "6017b730900dcb789c29b239",
        text: "ybtask1",
        status: "Pending",
        time: 1612116028,
      },
    ],
  },
  {
    _id: "60184a6e2b9da54f18e1858d",
    name: "Test from react",
    time: 1612204654953,
    tasks: [],
  },
];

export default function gettodo() {
  const headers = {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE3YWY3NTkwMGRjYjc4OWMyOWIyMzMiLCJpYXQiOjE2MTIxNjUxMTF9.uUehGfW1PXkEzfOfNYE9OCrKNtx3akxa2v5QVhQXe_M",
    "Content-Type": "application/json",
  };
  axios
    .get("http://localhost:3000/api/todo/all_todo_data", { headers: headers })
    .then((response) => {
      console.log(response.data.tasks_list)
      // return response.data.tasks_list;
    })
    .catch((error) => {
      console.log(error);
    });
    return todo;
}
