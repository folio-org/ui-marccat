/* eslint-disable */
import React from 'react';
import { createSubscription } from 'create-subscription';

export function SubscriberComponent({ data }) {
  return <div>You have {data} results!</div>;
}

export const BehaviorSubscription = createSubscription({
  getCurrentValue: source => source.getValue(),
  subscribe: (source, callback) => {
    const subscription = source.subscribe(callback);
    return () => subscription.unsubscribe;
  },
});

export const ReplaySubscription = createSubscription({
  getCurrentValue: replaySubject => {
    let currentValue;
    replaySubject
      .subscribe(value => {
        currentValue = value;
      })
      .unsubscribe();
    return currentValue;
  },
  subscribe: (replaySubject, callback) => {
    const subscription = replaySubject.subscribe(callback);
    return () => subscription.unsubscribe();
  }
});

export function withSubscriber(Component) {
  return class extends React.Component {
    render() {
      return (
        <BehaviorSubscription source={this.props.source}>
          <Component {...this.props}/>
        </BehaviorSubscription>
      );
    }
  }
}
