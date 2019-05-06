// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// // @flow strict
// import * as React from 'react';
// import {
//   SearchField,
//   Row, Col,
// } from '@folio/stripes/components';
// import { reduxForm, Field } from 'redux-form';
// import {
//   SearchIndexes,
//   SearchConditions,
// } from '..';

// function SearchForm() {
//   return (
//     <form name="searchForm" onKeyDown={handleKeyDown} onChange={handleOnChange}>
//       <Row>
//         <Col xs={1}>
//           <div
//             className={(leftBracketEnable) ? styles.leftBracket : styles.leftBracketDisabled}
//             onClick={() => this.setState({
//               leftBracketEnable: !leftBracketEnable
//             })}
//           />
//         </Col>
//         <Col xs={10} className={styles.forwardBracket}>
//           <Row>
//             <Col xs={12}>
//               <div>
//                 <SearchIndexes
//                   id="selectIndexes"
//                   name="selectIndexes"
//                   {...this.props}
//                 />
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col xs={12}>
//               <SearchConditions
//                 id="selectCondition"
//                 name="selectCondition"
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col xs={12}>
//               <div>
//                 <Field
//                   id="searchTextArea"
//                   name="searchTextArea"
//                   fullWidth
//                   component={SearchField}
//                   placeholder="Search..."
//                 />
//               </div>
//             </Col>
//           </Row>
//         </Col>
//         <Col xs={1}>
//           <div
//             className={(rightBracketEnable) ? styles.rightBracket : styles.rightBracketDisabled}
//             onClick={() => this.setState({
//               rightBracketEnable: !rightBracketEnable
//             })}
//           />
//         </Col>
//       </Row>
//     </form>
//   );
// }

// export default reduxForm({
//   form: 'searchForm',
//   navigationCheck: true,
//   enableReinitialize: true,
//   destroyOnUnmount: false,
// })(SearchForm);
