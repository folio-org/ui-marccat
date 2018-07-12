import React from 'react';
import PropTypes from 'prop-types';

const withProxy = ProxyWrapperComponent =>
  class WithProxyComponent extends React.Component {
    static manifest = Object.freeze(
      Object.assign({}, ProxyWrapperComponent.manifest, {})
    );

    static propTypes = {
      stripes: PropTypes.shape({
        hasPerm: PropTypes.func.isRequired,
      }),
      resources: PropTypes.shape({
        sponsors: PropTypes.object,
        proxies: PropTypes.object,
      }),
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string,
        }),
      }).isRequired,
      mutator: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        GET: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
        reset: PropTypes.func,
      }),
      sponsorsFor: PropTypes.shape({
        GET: PropTypes.func.isRequired,
        reset: PropTypes.func,
      }),
      proxies: PropTypes.shape({
        GET: PropTypes.func.isRequired,
        reset: PropTypes.func,
      }),
      sponsors: PropTypes.shape({
        GET: PropTypes.func.isRequired,
        reset: PropTypes.func,
      }),
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    static getDerivedStateFromProps(nextProps) {
      const {
        match: {
          params: { id },
        },
      } = nextProps;
      if (id) {
        return { userId: id };
      }
      return null;
    }

    componentDidUpdate(prevProps, prevState) {
      if (
        !this.props.stripes.hasPerm(
          'proxiesfor.collection.get'
        )
      ) {
        return;
      }

      const { userId } = this.state;

      if (userId !== prevState.userId) {
        this.loadSponsors(userId);
        this.loadProxies(userId);
      }
    }

    getRecords(resourceName, idKey) {
      const { resources } = this.props;
      const resourceForName = `${resourceName}For`;
      const records =
        (resources[resourceName] || {}).records || [];
      const recordsFor =
        (resources[resourceForName] || {}).records || [];

      if (!records.length) return records;

      const rMap = records.reduce(
        (memo, record) =>
          Object.assign(memo, { [record.id]: record }),
        {}
      );
      return recordsFor.map(r => ({
        proxy: r,
        user: rMap[r[idKey]],
      }));
    }

    update(resourceName, records) {
      const {
        match: { params },
        mutator,
      } = this.props;
      const userId = params.id;

      const edited = records.filter(rec => !!rec.proxy.id);
      const added = records.filter(rec => !rec.proxy.id);

      const editPromises = edited.map(rec =>
        mutator.PUT(rec.proxy)
      );
      const addPromises = added.map(rec => {
        const data =
          resourceName === 'proxies'
            ? {
                ...rec.proxy,
                proxyUserId: rec.user.id,
                userId,
              }
            : {
                ...rec.proxy,
                proxyUserId: userId,
                userId: rec.user.id,
              };

        return mutator.POST(data);
      });

      return Promise.all([...addPromises, ...editPromises]);
    }
    render() {
      return <ProxyWrapperComponent {...this.props} />;
    }
  };

export default withProxy;
