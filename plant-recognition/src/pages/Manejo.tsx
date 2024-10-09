import { useState } from 'react';

type Especies = 'Sida spp' | 'Sonchus spp' | 'Conyza bonariensis' | 'Digitaria insularis' | 'Bidens spp';
type Culturas = 'Soja' | 'Milho' | 'Trigo' | 'Aveia';

function Manejo() {
  const [especie, setEspecie] = useState<Especies | ''>(''); // Espécie de planta daninha selecionada
  const [populacaoPor05m2, setPopulacaoPor05m2] = useState(0); // População de plantas daninhas por 0,5 m²
  const [areaTotal, setAreaTotal] = useState(0); // Área total em m²
  const [cultura, setCultura] = useState<Culturas | ''>(''); // Cultura de interesse
  const [densidadePopulacao, setDensidadePopulacao] = useState(0); // Densidade total da população
  const [relatorio, setRelatorio] = useState<{ nome: string, dosagem: string }[]>([]); // Relatório com os herbicidas recomendados

  // Lista de herbicidas por espécie e cultura (exemplo)
  const herbicidasPorEspecieECultura: Record<Especies, Record<Culturas, { nome: string; dosagem: string; }[]>> = {
    'Sida spp': {
      Soja: [{ nome: '2,4 D 806 SL ALAMOS', dosagem: '1 a 1,5 L/ha' }],
      Milho: [{ nome: 'BURNTOP', dosagem: ' 0,350 a 0,420 Kg/ha' }],
      Trigo: [{ nome: 'BRADDOCK SL', dosagem: ' 3,0 L/ha' }],
      Aveia: [{ nome: 'BRADDOCK SL', dosagem: '3,0 L/ha' }]
    },
    'Sonchus spp': {
      Soja: [{ nome: '2,4 D 806 SL ALAMOS', dosagem: '1 a 1,5 L/ha' }],
      Milho: [{ nome: '2,4-D AGROIMPORT', dosagem: '0,5 a 1,5 l/ha' }],
      Trigo: [{ nome: ' AMINOL 806', dosagem: ' 0,5 - 0,75 L/Ha' }],
      Aveia: [{ nome: 'BRADDOCK SL', dosagem: '2 L/ha' }]
    },
    'Conyza bonariensis': {
      Soja: [{ nome: 'Herbicida E', dosagem: '1,2 L/ha' }],
      Milho: [{ nome: 'BURNTOP', dosagem: ' 0,175 a 0,350 Kg/ha' }],
      Trigo: [{ nome: 'BRADDOCK SL', dosagem: '2,0 L/ha' }],
      Aveia: [{ nome: 'GLI-UP 720 WG', dosagem: ' 0,5 a 1,5 Kg/ha ou 250 a 750 g/100 L água' }]
    },
    'Digitaria insularis': {
      Soja: [{ nome: 'AZUGRO', dosagem: ' 2,0 - 3,0 L/ha' }],
      Milho: [{ nome: 'GLIFOSATO 720 WG NORTOX', dosagem: '2-4 L/ha' }],
      Trigo: [{ nome: 'ARADDO', dosagem: '1 a 1,5 L/ha' }],
      Aveia: [{ nome: 'GLIFOSATO NORTOX SL', dosagem: '2 a 4 L/ha' }]
    },
    'Bidens spp': {
      Soja: [{ nome: 'Sem herbicida registrado para essa cultura', dosagem: '-' }],
      Milho: [{ nome: 'SOBERAN', dosagem: '180 ml p.c./ha' }],
      Trigo: [{ nome: 'Sem herbicida registrado para essa cultura', dosagem: '-' }],
      Aveia: [{ nome: 'Sem herbicida registrado para essa cultura', dosagem: '-' }]
    }
  };

  const calcular = () => {
    // Calcular a densidade de plantas daninhas
    const populacaoPorM2 = populacaoPor05m2 * 2; // Multiplicar por 2 para obter a população por m²
    const totalPopulacao = populacaoPorM2 * areaTotal; // Densidade total na área
    setDensidadePopulacao(totalPopulacao);

    // Gerar o relatório de herbicidas para a espécie e cultura selecionada
    if (especie && cultura && herbicidasPorEspecieECultura[especie][cultura]) {
      setRelatorio(herbicidasPorEspecieECultura[especie][cultura]);
    } else {
      setRelatorio([]); // Caso não haja recomendação para a combinação de espécie e cultura
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Cálculo de Herbicidas</h2>

      <label htmlFor="especie" className="block mb-2 text-sm font-medium text-gray-900">
        Selecione uma espécie de planta daninha:
      </label>
      <select
        id="especie"
        value={especie}
        onChange={(evt) => setEspecie(evt.target.value as Especies)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
      >
        <option value="">Espécie</option>
        <option value="Sida spp">Sida spp (Guanxuma)</option>
        <option value="Sonchus spp">Sonchus spp (Serralha)</option>
        <option value="Conyza bonariensis">Conyza bonariensis (Buva)</option>
        <option value="Digitaria insularis">Digitaria insularis(C. Amargoso)</option>
        <option value="Bidens spp">Bidens spp (Picão)</option>
      </select>

      <label htmlFor="populacaoPor05m2" className="block mb-2 text-sm font-medium text-gray-900 mt-4">
        População de plantas daninhas por 0,5 m²:
      </label>
      <input
        type="number"
        id="populacaoPor05m2"
        value={populacaoPor05m2}
        onChange={(evt) => setPopulacaoPor05m2(parseFloat(evt.target.value))}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="População por 0,5 m²"
        required
      />

      <label htmlFor="areaTotal" className="block mb-2 text-sm font-medium text-gray-900 mt-4">
        Área total (m²):
      </label>
      <input
        type="number"
        id="areaTotal"
        value={areaTotal}
        onChange={(evt) => setAreaTotal(parseFloat(evt.target.value))}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Área total em m²"
        required
      />

      <label htmlFor="cultura" className="block mb-2 text-sm font-medium text-gray-900 mt-4">
        Selecione uma cultura:
      </label>
      <select
        id="cultura"
        value={cultura}
        onChange={(evt) => setCultura(evt.target.value as Culturas)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
      >
        <option value="">Cultura</option>
        <option value="Soja">Soja</option>
        <option value="Milho">Milho</option>
        <option value="Trigo">Trigo</option>
        <option value="Aveia">Aveia</option>
      </select>

      <div className="flex justify-center mt-4">
        <button onClick={calcular} className="bg-green-800 text-white font-semibold py-2 px-4 rounded">
          Calcular
        </button>
      </div>

      {densidadePopulacao > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Resultados:</h3>
          <p>Densidade total de plantas daninhas: {densidadePopulacao.toLocaleString('pt-BR')} plantas</p>
        </div>
      )}

      {relatorio.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Herbicidas recomendados para {especie} na cultura de {cultura}:</h3>
          <ul>
            {relatorio.map((herbicida, index) => (
              <li key={index}>
                {herbicida.nome} - Dosagem: {herbicida.dosagem}
              </li>
            ))}
          </ul>
        </div>
      )}

      
    </div>
  );
}

export default Manejo;

