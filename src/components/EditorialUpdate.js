import React from 'react';
import {editorialDate} from '@site/src/utils/editorialDate.mjs';

export default function EditorialUpdate({date, label = 'Updated', itemProp}) {
  const update = editorialDate(date);
  if (!update) return null;
  return (
    <span>
      {label}{' '}
      <time dateTime={update.date} itemProp={itemProp}>
        {update.formattedDate}
      </time>
    </span>
  );
}
