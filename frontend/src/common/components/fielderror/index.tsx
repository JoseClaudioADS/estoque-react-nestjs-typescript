import React, { useState, useEffect } from 'react';

import { Wrapper } from './styles';

interface InnerErrors {
  path: string;
  message: string;
}

export interface FieldErrorProps {
  field: string;
  errors: Array<InnerErrors>;
}

const FieldError: React.SFC<FieldErrorProps> = ({ field, errors }) => {
  const [msgs, setMsgs] = useState(['']);

  useEffect(() => {
    const errorMsgs = errors
      .filter((e) => e.path === field)
      .map((e) => e.message);
    setMsgs(errorMsgs.length > 0 ? errorMsgs : []);
  }, [errors, field]);

  return (
    <Wrapper>
      {msgs.map((m) => (
        <div key={m}>
          <small>{m}</small> <br></br>
        </div>
      ))}
    </Wrapper>
  );
};

export default FieldError;
