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

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    const repositoriesUpdated = repositories.map(repository => {
      if (repository.id === id){
        return response.data;
      } else {
        return repository;
      }
    });

    setRepositories(repositoriesUpdated);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
              <li key={repository.id}>
                {repository.title}
                <p><a href={repository.url}> | GitHub</a> | {repository.likes} curtidas</p>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
                <button onClick={() => handleLikeRepository(repository.id)}>
                  Curtir !
                </button>
              </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
