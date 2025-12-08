export default [
  {
    type: "inputs",
    inputs: [
      { name: "email", label: "Email address", type: "email", required: true },
      { name: "password", label: "Password", type: "password", required: true },
    ],
  },
  {
    type: "button",
    text: "Sign in",
  },
  {
    type: "text",
    text: [
      { content: "create-user-link" }
    ]
  }
];
