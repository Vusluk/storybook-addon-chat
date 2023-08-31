import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    chat: {
      apiKey: 'AIzaSyDzhLFbMB3qJdCfIhI-BczAfZlID-xizwg',
      authDomain: 'dv-storybook-comments.firebaseapp.com',
      databaseURL: 'https://dv-storybook-comments-default-rtdb.europe-west1.firebasedatabase.app/',
      projectId: 'dv-storybook-comments',
      storageBucket: 'dv-storybook-comments.appspot.com',
      messagingSenderId: '447426488068',
    }
  },
};

export default preview;
