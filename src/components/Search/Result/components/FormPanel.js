// import React from 'react';
// import {
//   SearchField,
//   Button,
//   Row, Col,
//   Icon,
//   IconButton,
// } from '@folio/stripes/components';
// import { Field } from 'redux-form';
// import type { FormProps } from 'redux-form';
// import { SearchIndexes, OperatorSelect, SearchConditions } from '../..';
// import style from '../../index.css';

// type Props = {
//   someCustomThing: string
// } & FormProps;

// class FormPanel extends React.Component<Props, {}> {
//   render() {
//     const {
//       idx,
//       counter,
//       translate,
//       handleKeyDown,
//       handleOnChange,
//       handleAddSearchForm,
//       handleRemoveSearchForm } = this.props;
//     return (
//       <form onKeyDown={handleKeyDown} onChange={handleOnChange}>
//         <Row>
//           <Col xs={1}>
//             <div className={style.leftBracket} />
//           </Col>
//           <Col xs={10} className={style.forwardBracket}>
//             <Row>
//               <Col xs={12}>
//                 <div className={style.select_margin}>
//                   <SearchIndexes
//                     id="selectIndexes"
//                     name="selectIndexes"
//                     marginBottom0
//                     {...this.props}
//                   />
//                 </div>
//               </Col>
//             </Row>
//             <Row style={{ height: '30px' }}>
//               <Col xs={12}>
//                 <SearchConditions
//                   id="selectCondition"
//                   name="selectCondition"
//                   {...this.props}
//                 />
//               </Col>
//             </Row>
//             <Row>
//               <Col xs={12}>
//                 <div className={style.select_margin}>
//                   <Field
//                     id="searchTextArea"
//                     name="searchTextArea"
//                     fullWidth
//                     component={SearchField}
//                     placeholder="Search..."
//                   />
//                 </div>
//               </Col>
//             </Row>
//             {idx !== (counter.length - 1) &&
//               <Row>
//                 <Col xs={10}>
//                   <OperatorSelect
//                     {...this.props}
//                     id="operatorSelect"
//                     name="operatorSelect"
//                   />
//                 </Col>
//                 <Col xs={2} style={{ display: 'flex', marginTop: '14px' }}>
//                   <IconButton
//                     icon="trash"
//                     size="small"
//                   />
//                 </Col>
//               </Row>
//             }
//             <Row>
//               <Col xs={12}>
//                 <Button
//                   buttonClass={style.rightPosition}
//                 >
//                   <Icon icon="plus-sign">
//                     {translate({ id: 'ui-marccat.button.add.search.form' })}
//                   </Icon>
//                 </Button>
//               </Col>
//             </Row>
//           </Col>
//           <Col xs={1}>
//             <div className={style.rightBracket} idx={idx} />
//           </Col>
//         </Row>
//       </form>
//     );
//   }
// }

// export default FormPanel;
