import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/redux-store';

test('renders learn react link', () => {
  <Provider store = {store}>
       render(<App />);
  </Provider>
  //const linkElement = screen.getByLabelText('Example')
  //expect(linkElement).toBeInTheDocument();
});
