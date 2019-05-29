import { useState, useEffect, useContext, useRef } from 'react';
import shallowEqual from 'shallowequal';

export const isStateObject = x => x !== null && typeof x === 'object' && !Array.isArray(x);

const Context: React.Context<K> = React.createContext();

/**
 *
 * @param {*} mapState
 * @param {*} _dependencies
 */
export default function useStore(mapState, _dependencies = []) {
  const store = useContext<{}>(Context);
  const [state, setState] = useState(() => mapState(store.getState()));
  const [error, setError] = useState(null);

  const stateRef = useRef(state);
  const isActive = useRef(true);
  const unmounted = useRef(false);

  if (error) {
    throw error;
  }
  useEffect(() => {
    isActive.current = true;
    const calculateState = () => {
      if (!isActive.current) {
        return;
      }
      try {
        const newState = mapState(store.getState());
        if (
          newState === stateRef.current ||
          (isStateObject(newState) &&
            isStateObject(stateRef.current) &&
            shallowEqual(newState, stateRef.current))
        ) {
          return;
        }
        stateRef.current = newState;
        setState(() => stateRef.current);
      } catch (err) {
        isActive.current = false;

        setTimeout(() => {
          if (!unmounted.current && !isActive.current) {
            setError(err);
          }
        }, 200);
      }
    };
    calculateState();
    const unsubscribe = store.subscribe(calculateState);
    return () => {
      isActive.current = false;
      unsubscribe();
    };
  }, [mapState, store]);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  return state;
}
