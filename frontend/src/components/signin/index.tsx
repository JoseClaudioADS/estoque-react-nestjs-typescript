import React, { useState, useCallback, useContext } from 'react';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { Wrapper, Container, Button } from './styles';
import FieldError from '../../common/components/fielderror';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

class LoginDataState {
  email = '';
  password = '';
}

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

const SignIn: React.SFC = () => {
  const [loginData, setLoginData] = useState(new LoginDataState());
  const [errors, setErrors] = useState(new Array<any>());

  const { handleLogin } = useContext(AuthContext);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await schema.validate(loginData, { abortEarly: false });
      const { data } = await api.post('/auth/login', loginData);
      toast.success('Login realizado com sucesso.');
      handleLogin(data.token);
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        setErrors(e.inner);
      } else {
        toast.error('Email/senha inválida.');
      }
    }
  }

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setLoginData((prevLoginData) => {
        return {
          ...prevLoginData,
          [name]: value,
        };
      });
    },
    []
  );

  return (
    <Wrapper>
      <Container>
        <form
          className="pure-form pure-form-stacked"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset>
            <legend>Login</legend>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="pure-input-1"
                id="email"
                value={loginData.email}
                onChange={onInputChange}
              />
              <FieldError field="email" errors={errors}></FieldError>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="pure-input-1"
                id="password"
                value={loginData.password}
                onChange={onInputChange}
              />
              <FieldError field="password" errors={errors}></FieldError>
            </div>
            <Button type="submit" className="pure-button">
              Entrar
            </Button>
          </fieldset>
        </form>
      </Container>
      <ToastContainer />
    </Wrapper>
  );
};

export default SignIn;
