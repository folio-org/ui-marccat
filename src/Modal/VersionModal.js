// /* @flow */
// import React from 'react';

// type VersionModalProps = {
//   appTitle: string,
//   appVersion: string,
//   classes: Object,
//   appIcon: string,
//   open: boolean,
//   onClick: Function,
//   onClose: Function,
//   message: string,
//   translate: Function,
// };
// type VersionModalState = {
//   open: boolean,
// };

// const soureImg = require('../../../icons/app-modal.svg');

// export default class VersionModal extends React.Component<
//   VersionModalProps,
//   VersionModalState
// > {
//   render() {
//     const { appTitle, appVersion, credits, classes } = this.props; // eslint-disable-line no-unused-vars

//     return (
//       <MuiThemeProvider theme={theme}>
//         <Dialog
//           open={this.props.open}
//           keepMounted
//           onClose={this.props.onClose}
//           aria-labelledby="alert-dialog-slide-title"
//           aria-describedby="alert-dialog-slide-description"
//         >
//           <DialogTitle id="alert-dialog-slide-title">
//             <div className={classes.row}>
//               <img src={soureImg} alt="app" />
//             </div>
//             <p className={classes.title}>{appTitle}</p>
//             <p className={classes.version}>{appVersion}</p>
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText
//               id="alert-dialog-slide-description"
//               className={classes.credits}
//             >
//               <p className={classes.credits}>{credits}</p>
//               Lorem ipsum dolor sit amet, consectetur
//               adipisicing elit, sed do eiusmod tempor
//               incididunt ut labore et dolore magna aliqua.
//               Ut enim ad minim veniam, quis nostrud
//               exercitation ullamco laboris nisi ut aliquip
//               ex ea commodo consequat. Duis aute irure dolor
//               in reprehenderit in voluptate velit esse
//               cillum dolore eu fugiat nulla pariatur.
//               Excepteur sint occaecat cupidatat non
//               proident, sunt in culpa qui officia deserunt
//               mollit anim id est laborum
//             </DialogContentText>
//           </DialogContent>
//         </Dialog>
//       </MuiThemeProvider>
//     );
//   }
// }
