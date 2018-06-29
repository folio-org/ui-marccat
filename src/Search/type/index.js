/* @flow */

export type SearchProps = {|
    stripes: {
    connect: Function,
        intl: Object
},
history: {
    goBack: Function,
        pop: Function,
            push: Function
}
    |}
export type SearchState = {|
    showRestrictionSettings: bool
|};
type RestricionProps = {||}; // eslint-disable-line no-unused-vars
type RestricionRouterState = {||}; // eslint-disable-line no-unused-vars
