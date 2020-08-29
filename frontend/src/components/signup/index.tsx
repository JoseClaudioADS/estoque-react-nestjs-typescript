import React, { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { Wrapper, Container } from './styles';
import FieldError from '../../common/components/fielderror';
import api from '../../services/api';

class UserState {
  name = '';
  email = '';
  password = '';
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

function SignUp() {
  const [user, setUser] = useState(new UserState());
  const [errors, setErrors] = useState(new Array<any>());

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await schema.validate(user, { abortEarly: false });
      await api.post('/users', user);
      toast.success('Cadastro realizado com sucesso.');
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        setErrors(e.inner);
      } else {
        e.response.data.errors.forEach((e: string) => {
          toast.error(e);
        });
      }
    }
  }

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setUser((prevUser) => {
        return {
          ...prevUser,
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
            <legend>Cadastro de usuários</legend>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="pure-input-1"
                value={user.name}
                onChange={onInputChange}
              />
              <FieldError field="name" errors={errors}></FieldError>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="pure-input-1"
                id="email"
                value={user.email}
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
                value={user.password}
                onChange={onInputChange}
              />
              <FieldError field="password" errors={errors}></FieldError>
            </div>
            <button type="submit" className="pure-button pure-button-primary">
              Cadastrar
            </button>
          </fieldset>
        </form>
      </Container>
      <ToastContainer />
    </Wrapper>
  );
}

export default SignUp;
