import { useState } from 'react';

type SpecimenData = {
  species: string;
  frequencyRelative: number
  densityRelative: number
  abundanceRelative: number
  density: number
  sampleCount: number;
  individualsFound: number;
}

type Result = {
  species: string
  iir: number
}

function ImportanciIndex() {
  const [speciesData, setSpeciesData] = useState<SpecimenData[]>([]); // Armazenar dados de várias espécies
  const [species, setSpecies] = useState(''); // Nome da espécie
  const [individualsFound, setIndividualsFound] = useState(0); // Número de indivíduos encontrados em 0,5 m²
  const [sampleCount, setSampleCount] = useState(0); // Número de quadros amostrados
  const [finalResults, setFinalResults] = useState<Result[]>([]); // Armazenar os resultados finais do IIR

  // Função para adicionar dados de uma nova espécie
  const addSpeciesData = () => {
    if (species && individualsFound >= 0 && sampleCount > 0) {
      const density = (individualsFound / 0.5) * 2;

      const newSpeciesData: SpecimenData[] = [
        ...speciesData,
        {
          abundanceRelative: 0,
          density,
          densityRelative: 0,
          frequencyRelative: 0,
          individualsFound,
          sampleCount,
          species
        }
      ]

      const totalFrequency = newSpeciesData.reduce((acc, curr) => acc + curr.sampleCount, 0)
      const totalDensity = newSpeciesData.reduce((acc, curr) => acc + curr.density, 0)
      const totalAbundance = newSpeciesData.reduce((acc, curr) => acc + curr.individualsFound, 0)

      // // Calcular índices
      const updatedResults: SpecimenData[] = newSpeciesData.map(item => {
        const frequencyRelative = (item.sampleCount / totalFrequency) * 100; // Frequência Relativa
        const densityRelative = (item.density / totalDensity) * 100; // Densidade Relativa
        const abundanceRelative = (item.individualsFound / totalAbundance) * 100; // Abundância Relativa

        return {
          ...item,
          frequencyRelative,
          densityRelative,
          abundanceRelative,
        };
      });

      setSpeciesData(updatedResults);

      // Limpar campos
      setSpecies('');
      setIndividualsFound(0);
      setSampleCount(0);

      
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault(); // Evitar o recarregamento da página
    addSpeciesData(); // Adicionar dados da nova espécie
  };

  // Função para calcular e exibir os resultados finais
  const handleCalculate = () => {
    if (speciesData.length > 0) {
      const totalFrequency = speciesData.reduce((acc, curr) => acc + curr.sampleCount, 0);
      const totalDensity = speciesData.reduce((acc, curr) => acc + curr.density, 0); // Densidade total
      const totalAbundance = speciesData.reduce((acc, curr) => acc + curr.individualsFound, 0);

      // Calcular índices
      const results = speciesData.map(item => {
        const frequencyRelative = (item.sampleCount / totalFrequency) * 100; // Frequência Relativa
        const densityRelative = (item.density / totalDensity) * 100; // Densidade Relativa
        const abundanceRelative = (item.individualsFound / totalAbundance) * 100; // Abundância Relativa

        const ir = frequencyRelative + densityRelative + abundanceRelative

        return {
          species: item.species,
          iir: ir / 300 * 100,
        };
      });

      setFinalResults(results);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="species" className="block mb-2 text-sm font-medium text-gray-900">Espécie:</label>
        <input
          type="text"
          id="species"
          value={species}
          onChange={(evt) => setSpecies(evt.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Nome da Espécie"
          required
        />

        <label htmlFor="individualsFound" className="block mb-2 text-sm font-medium text-gray-900 mt-4">Número de indivíduos encontrados (em 0,5 m²):</label>
        <input
          type="number"
          id="individualsFound"
          value={individualsFound}
          onChange={(evt) => setIndividualsFound(parseFloat(evt.target.value))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Indivíduos encontrados"
          required
        />

        <label htmlFor="sampleCount" className="block mb-2 text-sm font-medium text-gray-900 mt-4">Número de quadros amostrados:</label>
        <input
          type="number"
          id="sampleCount"
          value={sampleCount}
          onChange={(evt) => setSampleCount(parseInt(evt.target.value, 10))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Número de quadros"
          required
        />

        <button
          type="submit"
          className="mt-4 w-full text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Adicionar Espécie
        </button>
      </form>

      <button
        onClick={handleCalculate}
        className="mt-4 w-full text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Calcular IIR
      </button>

      <h2 className="mt-4 text-lg font-semibold">Resultados do IIR:</h2>
      <ul className="mt-2">
        {finalResults.map((item, index) => (
          <li key={index} className="mb-2 text-gray-800">
            {item.species}: IIR = {item.iir.toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImportanciIndex;

