// /* eslint-disable no-unused-vars */

// import React, { useContext } from 'react';
// import type { Dispatch } from 'redux';

// type StoreContext<K> = {
//   ctx: React.Context<K>
// }
// const BaseContext: React.Context<K> = React.createContext();

// /**
//  *
//  *
//  * @export
//  * @template K
//  * @param {React.Context<K>} ctx
//  * @returns
//  */
// export default function useActions<K>(ctx: StoreContext<K>, mapActions) {
//   const store = useContext(ctx);
//   return mapActions(store.dispatch);
// }
