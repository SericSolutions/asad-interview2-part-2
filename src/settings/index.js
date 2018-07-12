export default {
  apiUrl: 'http://yoursite.com/api/'
};
const siteConfig = {
  siteName: 'Auto Labs',
  siteIcon: 'ion-flash',
  footerText: 'Auto Labs Dashboard v.1.0.0 ©2018 Auto Labs, Inc.'
};

const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault'
};
const language = 'english';
const AlgoliaSearchConfig = {
  appId: '',
  apiKey: ''
};
const Auth0Config = {
  domain: 'autolabs.auth0.com',
  clientID: 'QMFJ5szepRTza1i5_QVGAeGyAhsnwXl7',
  allowedConnections: ['Username-Password-Authentication'],
  rememberLastLogin: true,
  language: 'en',
  closable: true,
  options: {
    auth: {
      autoParseHash: true,
      redirect: true,
      redirectUrl: 'http://localhost:3000/auth0loginCallback'
    },
    languageDictionary: {
      title: 'Auto Labs',
      emailInputPlaceholder: 'email@dealership.com',
      passwordInputPlaceholder: 'password'
    },
    theme: {
      labeledSubmitButton: true,
      logo: '',
      primaryColor: '#E14615',
      authButtons: {
        connectionName: {
          displayName: 'Log In',
          primaryColor: '#b7b7b7',
          foregroundColor: '#000000'
        }
      }
    }
  }
};
const firebaseConfig = {
  apiKey: 'AIzaSyAgPjpp_ZlZV2tDO1vbkL0MKb0AoqqVHf4',
  authDomain: 'auto-labs.firebaseapp.com',
  databaseURL: 'https://auto-labs.firebaseio.com',
  projectId: 'auto-labs',
  storageBucket: 'auto-labs.appspot.com',
  messagingSenderId: '312800420933'
};
const googleConfig = {
  apiKey: '' //
};
const mapboxConfig = {
  tileLayer: '',
  maxZoom: '',
  defaultZoom: '',
  center: []
};
const youtubeSearchApi = '';
export {
  siteConfig,
  themeConfig,
  language,
  AlgoliaSearchConfig,
  Auth0Config,
  firebaseConfig,
  googleConfig,
  mapboxConfig,
  youtubeSearchApi
};
