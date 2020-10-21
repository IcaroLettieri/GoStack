import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`, 
      url: "https://github.com/IcaroLettieri/gostack-desafio-conceitos-reactjs", 
      techs: ['ReacJS', 'JavaScript', 'HTML5', 'CSS'],
    });
    setRepositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  async function handleAddLike(id) {
    const response = await api.post(`repositories/${id}/like`);

    const newRepositories = repositories.filter(
      repository => repository.id !== id
    );
    
    setRepositories([ ...newRepositories, response.data]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
              <li key={repository.id}>
                {repository.title}
                <p><a href={repository.url}> | GitHub</a> | Likes: {repository.likes}</p>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
                <button onClick={() => handleAddLike(repository.id)}>
                  Like !
                </button>
              </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
