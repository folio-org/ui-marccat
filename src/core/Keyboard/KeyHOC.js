/**
 * @author: Christian Chiama
 *
 * @format
 * @flow
 */
import Mousetrap from 'mousetrap';

// /**
//  * HOC
//  * @param {WrappedComponent} a Component to inject props
//  */
// export default function KeyboardHandlerHOC<Props: {
//   root: Object,
//   history: Object,
//   stripes: Object;
//   intl: Object;
// }>(Component: React.ComponentType<Props>): React.ComponentType<Props> {
//   function WrapperComponent(props: Props) {
//     const { store } = props.root;
//     return (
//       <Component
//         {...props}
//         store={store}
//         router={props.history}
//         translate={props.intl.formatMessage}
//       />);
//   }
//   return withRoot(injectIntl(connect(WrapperComponent, META.MODULE_NAME)));
// }

export default function registerKeybordListener(combinations: any, cb:Function) {
  Mousetrap.bind(combinations, cb);
}
