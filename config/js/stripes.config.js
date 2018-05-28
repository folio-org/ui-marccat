module.exports = {
  okapi: { 'url':'http://192.168.0.28:9130', 'tenant':'diku' },
  //okapi: { 'url':'http://127.0.0.1:8081', 'tenant':'tnx' },
  config: {
   // autoLogin: { username: 'diku_admin', password: 'admin' },
    logCategories: 'core,redux,connect,connect-fetch,substitute,path,mpath,mquery,action,event,perm,interface,xhr',
    logPrefix: 'stripes',
    logTimestamp: true,
    showPerms: true,
    showHomeLink: true,
    listInvisiblePerms: true,
   // disableAuth: true,
    hasAllPerms: true,
    softLogout: true
  },
  modules: {
    '@folio/cataloging': {}
  },
};
