
import { useNavigate } from 'react-router';

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-center items-center shadow-md p-3 bg-green-900 h-32 w-80 rounded-lg cursor-pointer" onClick={() => navigate("recognition")}>
                    <span className="text-white">Identificação</span>
                </div>
                <div className="flex justify-center items-center shadow-md p-3 bg-green-900 h-32 w-80 rounded-lg cursor-pointer" onClick={() => navigate("IIR")}>
                    <span className="text-white">Índice de Importância</span>
                </div>
                <div className="flex justify-center items-center shadow-md p-3 bg-green-900 h-32 w-80 rounded-lg cursor-pointer" onClick={() => navigate("IS")}>
                    <span className="text-white">Índice de Similaridade</span>
                </div>
                <div className="flex justify-center items-center shadow-md p-3 bg-green-900 h-32 w-80 rounded-lg cursor-pointer" onClick={() => navigate("Manejo")}>
                    <span className="text-white">Manejo</span>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
