import React, { useEffect, useState, useCallback } from 'react';
import format from 'date-fns/format';
import { ToastContainer, toast } from 'react-toastify';
import history from '../../services/history';
import api from '../../services/api';

import { EditButton, DeleteButton } from './styles';

export interface ItemsProps {}

interface Item {
  id: string;
  name: string;
  expirationDate: Date;
}

const Items: React.SFC<ItemsProps> = () => {
  const [items, setItems] = useState(new Array<Item>());

  useEffect(() => {
    async function getItems() {
      const { data } = await api.get('/items');

      setItems(data.items);
    }

    getItems();
  }, []);

  const handleDestroy = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/items/${id}`);
        toast.info('Item deletado com sucesso.');
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
      } catch (e) {
        e.response.data.errors.forEach((e: string) => {
          toast.error(e);
        });
      }
    },
    [items]
  );

  return (
    <>
      <h1>Itens</h1>
      <button
        type="button"
        className="pure-button pure-button-primary"
        onClick={() => {
          history.push('/items/add');
        }}
      >
        Novo item
      </button>
      <br></br>
      <br></br>
      {items.length > 0 ? (
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de validade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{format(new Date(item.expirationDate), 'dd/MM/yyyy')}</td>
                <td>
                  <EditButton
                    className="pure-button"
                    onClick={() => handleDestroy(item.id)}
                  >
                    Editar
                  </EditButton>
                  <DeleteButton
                    className="pure-button"
                    onClick={() => handleDestroy(item.id)}
                  >
                    Excluir
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Nenhum item cadastrado</h3>
      )}
      <ToastContainer />
    </>
  );
};

export default Items;
