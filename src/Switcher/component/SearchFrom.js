// import React from 'react';
// import { Button, SearchField } from '@folio/stripes-components';
// import { FormattedMessage } from 'react-intl';

// type SearchFromProps = {
//     searchType: string;
//     searchString: string;
// };

// class SearchFrom extends React.Component<SearchFromProps, {}> {
//     handleSearchSubmit = (e) => {
//       e.preventDefault();
//       this.props.onSearch();
//     };
//     handleChangeSearch = (e) => {
//       this.props.onSearchChange(e.target.value);
//     };

//       handleClearSearch = () => {
//         this.props.onSearchChange('');
//       };

//       render() {
//         const { searchType } = this.props;
//         return (
//           <form onSubmit={this.handleSearchSubmit}>
//             <div data-test-title-search-field>
//               <SearchField
//                 name="search"
//                 onChange={this.handleChangeSearch}
//                 onClear={this.handleClearSearch}
//                 value=""
//                 placeholder={`Search ${searchType}...`}
//                 ariaLabel={`Search ${searchType}`}
//                 loading
//               />
//             </div>
//             <Button
//               type="submit"
//               buttonStyle="primary"
//               fullWidth
//               disabled={false}
//               data-test-search-submit
//             >
//               <FormattedMessage id="ui-marccat.navigator.search" />
//             </Button>
//             {/* {Filters && (
//           <div>
//             <hr />
//             <Filters
//               activeFilters={combinedFilters}
//               onUpdate={this.handleUpdateFilter}
//             />
//           </div>
//         )} */}
//           </form>
//         );
//       }
// }

// export default SearchFrom;
