/* @flow */
export type NavigationProps = {|
  stripes: {
  connect: Function,
    intl: Object
},
history: {
  goBack: Function,
      pop: Function,
          push: Function
},
match: {
  path: string,
    id: string
},
location: {
  pathname: string
},
onToggleSubSection: Function,
  handleClose: Function;
|}

export type NavigationState = {
  navigatorFixed: boolean,
  subSections: {
    searchSection: boolean,
    reportSection: boolean,
    templateSection: boolean
  }
};
