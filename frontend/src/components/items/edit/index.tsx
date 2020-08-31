import React, { useState, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import FieldError from '../../../common/components/fielderror';
import api from '../../../services/api';
import history from '../../../services/history';
import { useParams } from 'react-router-dom';

export interface EditItemProps {}

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do item é obrigatório'),
  expirationDate: Yup.date().required().typeError('Data de validade incorreta'),
});

class ItemState {
  name = '';
  expirationDate = new Date();
}

interface RouteParams {
  id: string;
}

const EditItem: React.SFC<EditItemProps> = () => {
  const [item, setItem] = useState(new ItemState());
  const [errors, setErrors] = useState(new Array<any>());

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    async function getItem(id: string) {
      const { data } = await api.get(`/items/${id}`);

      setItem({
        name: data.name,
        expirationDate: new Date(data.expirationDate),
      });
    }

    if (id) {
      getItem(id);
    }
  }, [id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await schema.validate(item, { abortEarly: false });
      if (id) await api.put(`/items/${id}`, item);
      else await api.post('/items', item);
      toast.success(`Item ${id ? 'editado' : 'cadastrado'} com sucesso.`);
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

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setItem((prevItem) => {
        return {
          ...prevItem,
          [name]: value,
        };
      });
    },
    []
  );

  return (
    <form
      className="pure-form pure-form-stacked"
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset>
        <legend>{id ? 'Editar' : 'Novo'} item</legend>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={item.name}
          onChange={onInputChange}
        />
        <FieldError field="name" errors={errors}></FieldError>
        <label htmlFor="expirationDate">Data de validade</label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={item.expirationDate}
          name="expirationDate"
          onChange={() => {}}
          onChangeRaw={onInputChange}
        />{' '}
        <FieldError field="expirationDate" errors={errors}></FieldError>
        <br></br>
        <button type="submit" className="pure-button pure-button-primary">
          {id ? 'Salvar' : 'Cadastrar'}
        </button>
      </fieldset>
      <ToastContainer />
    </form>
  );
};

export default EditItem;
