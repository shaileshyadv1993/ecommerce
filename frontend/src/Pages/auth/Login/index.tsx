import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../Services/toaster.service";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";
import { Formik, ErrorMessage } from "formik";
import { object, string } from "yup";
import { AuthInterface } from "../../../interface/auth.interface";
import { postData } from "../../../Services/axios.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const registerSignInHandler = async (e: any) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await axios.post(
        `${config.SERVER_URL}/auth/login`,
        data
      );
      if (response.status === 200) {
        // navigate("/");
        successToast(response.data.status);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(error.response.data.error);
    }
  };

  let authvalidationSchema = object({
    email: string().email().required("Email is required field."),
    password: string()
      .min(8, "Minimum length of password should be 8")
      .required("Password is required field."),
  });

  const loginHandler = async (values: AuthInterface) => {
    console.log(values);
    const resp = await postData("/auth/login", values);
  };

  return (
    <>
      <Container
        className="shadow-lg  bg-body rounded h-auto"
        style={{ width: "25rem" }}
      >
        <Row
          className="d-flex justify-content-center "
          // style={{ background: "red" }}
        >
          <Col xs={8} md={12}>
            <h1 className="mb-4">Sign-In</h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={authvalidationSchema}
              onSubmit={loginHandler}
            >
              {({
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className=" mb-3">
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      type="email"
                      placeholder="Enter your email"
                      required
                      onChange={handleChange}
                      className="w-100"
                      onBlur={handleBlur}
                    />
                    {/* {console.log("touched", touched)} */}
                    <span className="text-danger ">
                      {touched.email && errors.email}
                    </span>
                  </div>
                  <div className="w-100 mb-3">
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      // fullWidth
                      placeholder="Enter your password"
                      type="password"
                      required
                      onChange={handleChange}
                      className="mb-2 w-100"
                      onBlur={handleBlur}
                    />
                    <span className="text-danger mb-4">
                      {touched.password && errors.password}
                    </span>
                  </div>
                  <Button type="submit" variant="contained" className="m-3 ">
                    Sign-in
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
