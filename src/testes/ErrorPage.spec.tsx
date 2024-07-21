import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

describe('ErrorPage', () => {
  it('deve renderizar a imagem de erro 404', () => {
    const { getByAltText } = render(
      <Router>
        <ErrorPage />
      </Router>
    );
    const image = getByAltText('Imagem de erro 404');
    expect(image).toBeInTheDocument();
  });

  it('deve renderizar o botão de voltar para a página inicial', () => {
    const { getByText } = render(
      <Router>
        <ErrorPage />
      </Router>
    );
    const button = getByText('Voltar para a página inicial');
    expect(button).toBeInTheDocument();
  });

  it('deve ter o link para a página inicial', () => {
    const { getByText } = render(
      <Router>
        <ErrorPage />
      </Router>
    );
    const link = getByText('Voltar para a página inicial').closest('a');
    expect(link).toHaveAttribute('href', '/');
  });
});
