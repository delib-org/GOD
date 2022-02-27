import axios from "axios";
const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const schema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 2 },
    password: { type: "string", minLength: 6 },
  },
  required: ["username", "password"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export async function handleLogin(ev: any) {
  try {
    ev.preventDefault();
    console.log("test");
    let { username, password } = ev.target.elements;
    username = username.value;
    password = password.value;

    const valid = validate({ username, password });
    if (!valid)
      throw new Error(
        `${validate.errors[0].dataPath} ${validate.errors[0].message}`
      );

    console.log(username, password);
    const { data } = await axios.post("/user/login", { username, password });

    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

export async function handleSecret() {
  try {
    const { data } = await axios.get("/user/get_secret");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

export async function handleLogout() {
  try {
    const { data } = await axios.get("/logout");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
