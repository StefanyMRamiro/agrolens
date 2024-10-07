import React, { useState } from 'react';

function SimilarityIndex() {
  const [area1Species, setArea1Species] = useState('');
  const [area2Species, setArea2Species] = useState('');
  const [similarityIndex, setSimilarityIndex] = useState<number | null>(null); // Estado para armazenar o resultado do índice de similaridade

  // Função para lidar com o envio do formulário
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault(); // Evitar o recarregamento da página

    // Obter espécies como arrays
    const area1Array = area1Species.split(',').map(species => species.trim());
    const area2Array = area2Species.split(',').map(species => species.trim());

    // Contar espécies comuns
    const commonSpecies = area1Array.filter(species => area2Array.includes(species));
    const commonCount = commonSpecies.length; // Número de espécies comuns
    const area1Count = area1Array.length; // Total de espécies na Área 1
    const area2Count = area2Array.length; // Total de espécies na Área 2

    // Cálculo do Índice de Similaridade de Sorensen
    const calculatedIndex = (2 * commonCount) / (area1Count + area2Count);
    setSimilarityIndex(calculatedIndex); // Atualiza o estado com o valor calculado
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="area1Species" className="block mb-2 text-sm font-medium text-gray-900">Espécies na Área 1 (separadas por vírgula)</label>
        <input
          type="text"
          id="area1Species"
          onChange={(evt) => setArea1Species(evt.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Espécies na Área 1"
          required
        />
        
        <label htmlFor="area2Species" className="block mb-2 text-sm font-medium text-gray-900 mt-4">Espécies na Área 2 (separadas por vírgula)</label>
        <input
          type="text"
          id="area2Species"
          onChange={(evt) => setArea2Species(evt.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Espécies na Área 2"
          required
        />
        
        <button
          type="submit"
          className="mt-4 w-full text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Calcular Índice de Similaridade
        </button>
      </form>

      {similarityIndex !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Índice de Similaridade (Sorensen):</h2>
          <p>{similarityIndex.toFixed(2)}</p>
          <h3 className="text-md font-semibold">Espécies Comuns:</h3>
          <p>{area1Species.split(',').map(species => species.trim()).filter(species => area2Species.split(',').map(s => s.trim()).includes(species)).join(', ') || 'Nenhuma espécie comum'}</p>
        </div>
      )}
    </div>
  );
}

export default SimilarityIndex;
