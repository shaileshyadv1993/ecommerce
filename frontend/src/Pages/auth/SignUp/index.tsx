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
import { postData } from "../../../Services/axios.service";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const registerSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      warningToast("Password and confirm password must be same.");
    } else {
      const data = { name, email, password };

      const response = await postData("/auth/register", data);
      // try {
      //   const response = await axios.post(
      //     `${config.SERVER_URL}/auth/register`,
      //     data
      //   );
      console.log(response);
      if (response.status) {
        navigate("/");
        successToast(response.message);
      }
      // } catch (error: any) {
      //   errorToast(error.response.data.error);
      // }
    }
  };

  return (
    <>
      <Container className="shadow-lg p-3 bg-body rounded  w-75">
        <Row className="d-flex justify-content-center">
          <Col xs={10} md={5}>
            <h1 className="mb-5">Sign-Up</h1>
            <Form onSubmit={registerSubmitHandler}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                className="mb-2"
                required
                fullWidth
                autoFocus
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="email"
                label="E-mail"
                variant="outlined"
                className="mb-2"
                fullWidth
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                placeholder="Enter your password"
                type="password"
                className="mb-2"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                placeholder="Confirm password"
                type="password"
                className="mb-4"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button type="submit" variant="contained">
                Sign-up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
