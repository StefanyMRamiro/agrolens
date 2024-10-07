import { useState } from 'react';

function Manejo() {
  const [areaTotal, setAreaTotal] = useState(0); // Área total em hectares
  const [populacaoPor05m2, setPopulacaoPor05m2] = useState(0); // População de plantas daninhas por 0,5 m²
  const [taxaAplicacao, setTaxaAplicacao] = useState(0); // Taxa de aplicação em litros/hectare
  const [densidadePopulacao, setDensidadePopulacao] = useState(0); // Densidade total da população
  const [quantidadeHerbicida, setQuantidadeHerbicida] = useState(0); // Quantidade total de herbicida em litros

  const calcular = () => {
    // Cálculo da densidade da população total
    const areaTotalEmM2 = areaTotal * 10000; // Converter hectares para m²
    const populacaoPorM2 = (populacaoPor05m2 * 2); // 0,5 m² equivale a 2 m²
    const totalPopulacao = populacaoPorM2 * (areaTotalEmM2 / 0.5); // População total na área

    // Cálculo da quantidade de herbicida
    const quantidadeTotalHerbicida = taxaAplicacao * areaTotal; // Litros de herbicida necessários

    // Atualizar estados
    setDensidadePopulacao(totalPopulacao);
    setQuantidadeHerbicida(quantidadeTotalHerbicida);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Cálculo de Aplicação</h2>
      
      <label htmlFor="areaTotal" className="block mb-2 text-sm font-medium text-gray-900">Área total (ha):</label>
      <input
        type="number"
        id="areaTotal"
        value={areaTotal}
        onChange={(evt) => setAreaTotal(parseFloat(evt.target.value))}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Área total em hectares"
        required
      />

      <label htmlFor="populacaoPor05m2" className="block mb-2 text-sm font-medium text-gray-900">População de plantas daninhas por 0,5 m²:</label>
      <input
        type="number"
        id="populacaoPor05m2"
        value={populacaoPor05m2}
        onChange={(evt) => setPopulacaoPor05m2(parseFloat(evt.target.value))}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="População por 0,5 m²"
        required
      />

      <label htmlFor="taxaAplicacao" className="block mb-2 text-sm font-medium text-gray-900">Taxa de aplicação (L/ha):</label>
      <input
        type="number"
        id="taxaAplicacao"
        value={taxaAplicacao}
        onChange={(evt) => setTaxaAplicacao(parseFloat(evt.target.value))}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Taxa de aplicação em litros por hectare"
        required
      />

      <div className="flex justify-center mt-4">
        <button 
          onClick={calcular}
          className="bg-green-800 text-white font-semibold py-2 px-4 rounded"
        >
          Calcular
        </button>
      </div>

      {densidadePopulacao > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Resultados:</h3>
          <p>Densidade total de plantas daninhas: {densidadePopulacao} plantas</p>
          <p>Quantidade total de herbicida necessária: {quantidadeHerbicida} litros</p>
        </div>
      )}
    </div>
  );
}

export default Manejo;
