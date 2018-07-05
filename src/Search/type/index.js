/* @flow */

export type SearchProps = {|
    stripes: {
    connect: Function,
        intl: Object,
},
history: {
    goBack: Function,
        pop: Function,
            push: Function
}
    |}
export type SearchState = {|
    showRestrictionSettings: bool;
    handleClick:Function;
    handleCloseRestrictionPanel:Function;

|};
export type RestricionProps = {||}; // eslint-disable-line no-unused-vars
export type RestricionState = {|
    showRestrictionSettings: bool;
    connectedRestrictionSettingsView:Function;
    handleClick:Function;
    handleCloseRestrictionPanel:Function;
|};

