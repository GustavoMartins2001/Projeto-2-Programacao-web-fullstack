import { React, useState } from 'react';
import './App.css';
import CatImage from './CatImage';
import { Container } from 'react-bootstrap';
import { CatProvider } from './CatContext';
import LoginModal from './LoginModal';

function App() {
  return (
    <CatProvider className="App">
      <Container className="text-center">
        <LoginModal></LoginModal>

        <h1 className="my-4">Busca de Imagens de Gatos</h1>
        <CatImage />
      </Container>
    </CatProvider>
  );
}

export default App;
