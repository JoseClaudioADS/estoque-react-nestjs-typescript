import React, { useState } from 'react';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import FieldError from '../../../common/components/fielderror';
import api from '../../../services/api';
import history from '../../../services/history';

export interface EditItemProps {}

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do item é obrigatório'),
  expirationDate: Yup.date().required().typeError('Data de validade incorreta'),
});

const EditItem: React.SFC<EditItemProps> = () => {
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [errors, setErrors] = useState(new Array<any>());

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const item = { name, expirationDate };
      await schema.validate(item, { abortEarly: false });
      await api.post('/items', item);
      toast.success('Item cadastrado com sucesso.');
      history.push('/items');
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

  return (
    <form
      className="pure-form pure-form-stacked"
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset>
        <legend>Novo item</legend>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <FieldError field="name" errors={errors}></FieldError>
        <label htmlFor="expirationDate">Data de validade</label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={expirationDate}
          onChange={(date) => setExpirationDate(date as Date)}
        />{' '}
        <FieldError field="expirationDate" errors={errors}></FieldError>
        <br></br>
        <button type="submit" className="pure-button pure-button-primary">
          Cadastrar
        </button>
      </fieldset>
      <ToastContainer />
    </form>
  );
};

export default EditItem;
