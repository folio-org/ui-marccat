import React from 'react';
import { Layout } from '@folio/stripes-components';

export default ({ components }) => {
  return (
    <Layout>
      {components.map((c, idx) => (
        <Layout className={c.class} key={idx}>
          {c}
        </Layout>
      ))}
    </Layout>
  );
};
