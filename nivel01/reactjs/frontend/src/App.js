import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

/**
 * Componente
 * Propriedade: Alguma informação que você possa passar de um pai para um filho
 * Estado & Imutabilidade: garantir performace mesmo em app que possui muitos dados
 */

function App() {
  // useState retorna array com 2 posições
  //
  // 1. Variável com o seu valor inicial
  // 2. Funcção para atualizarmos esse valor

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    //projects.push(`Novo projeto ${Date.now()}`);
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);
    // console.log(projects);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
	    owner: "Diego Fernandes"
    });

    const project = response.data;

    setProjects([ ...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}

export default App;