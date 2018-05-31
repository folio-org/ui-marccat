module.exports = {
  okapi: { 'url':'http://192.168.0.28:9130', 'tenant':'diku' },
  config: {
    logCategories: 'core,redux,connect,connect-fetch,substitute,path,mpath,mquery,action,event,perm,interface,xhr',
    logPrefix: 'stripes',
    logTimestamp: true,
    showPerms: true,
    showHomeLink: true,
    listInvisiblePerms: true,
    hasAllPerms: true,
    softLogout: true
  },
  modules: {}
};
