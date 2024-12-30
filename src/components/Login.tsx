import React, { useState } from 'react';

const Login = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleCompanyChange = (e) => setCompany(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nombre:', name);
    console.log('Compañía:', company);
    alert(`¡Hola ${name} de ${company}!`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-sm w-full p-6 border border-gray-300 rounded-lg shadow-md bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Ingresa tu nombre"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Compañía:
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={handleCompanyChange}
              placeholder="Ingresa tu compañía"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
