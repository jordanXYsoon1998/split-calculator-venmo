import React, { useState } from 'react';
import Field from '../Field';

const BillSplitMainForm = () => {
  const [titleCaption, setTitleCaption] = useState('');

  return (
    <form className="ui form">
      <div className="field">
        <Field
          className="massive transparent"
          name="title-caption"
          placeholder="Title/Caption"
          value={titleCaption}
          onChange={setTitleCaption}
        />
      </div>
    </form>
  );
};

export default BillSplitMainForm;
