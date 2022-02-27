import Ajv from "ajv";

const ajv = new Ajv();

const user = {
    type: "object",
    properties: {
        username: { type: "string" },
        password: { type: "string" }
    },
    required: ['username', 'password'],
    additionalProperties: false,
}
export const userValidate = ajv.compile(user)