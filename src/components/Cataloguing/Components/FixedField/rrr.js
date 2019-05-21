// import React, { useState, useEffect } from 'react';
// import { Field } from '../Common/Field';


// export default function RepeatableField(props) {

//   const [fields, setFields] = useState(props.record.fields);

//   useEffect(() => {
//     const { record } = props;
//     setFields(record.fields);
//   }, [props]);

//   const handleAdd = () => {
//     setFields(() => ({
//       fields: fields.concat({})
//     }));
//   };

//   const handleRemove = (index) => {
//     setFields(() => ({
//       fields: [...fields.slice(0, index), ...fields.slice(index + 1)]
//     }));
//   };

//   return (
//     <React.Fragment>
//       {fields.map((field, index) => (
//         <Field
//           {...props}
//           label={field.label}
//           name={field.name}
//           prepend="true"
//           onClick={}
//         />
//       ))}
//     </React.Fragment>
//   );
// }
