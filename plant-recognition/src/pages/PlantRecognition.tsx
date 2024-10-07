import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";
import ImagePicker from "../components/ImagePicker";
import { INFOS } from "../info";
import Details from "../components/Details";

interface AnalyzeData {
    confidence: number;
    filename: string;
    prediction: 'Sonchus spp.' | 'Sida spp.';
}

function PlantRecognition() {
    const [selectedImage, setSelectedImage] = useState<File>();
    const [result, setResult] = useState<AnalyzeData>();
    const [isLoading, setIsLoading] = useState(false);

    const analyzePlant = async () => {
        if (!selectedImage) return;

        try {
            setIsLoading(true);
            const formData = new FormData();

            formData.append("file", selectedImage);

            const res = await axios.post<AnalyzeData>(
                `${import.meta.env.VITE_API_URL}/analyze`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setResult(res.data);

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 w-screen min-h-full text-black">
            <div className="flex flex-col gap-3">
                {selectedImage ? (
                    <div className="p-2 flex flex-col items-center justify-center">
                        <img
                            alt="not found"
                            width="324px"
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <div className="flex justify-center gap-4 mt-4">
                            <Button
                                label="Trocar Imagem"
                                onClick={() => {
                                    setSelectedImage(undefined);
                                    setResult(undefined)
                                }}
                            />

                            <Button
                                label={isLoading ? "Identificando..." : "Identificar"}
                                onClick={() => {
                                    analyzePlant();
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mt-20 w-full bg-gray-100 p-4 rounded-lg shadow-md">
                        <ImagePicker setSelectedImage={setSelectedImage} />
                    </div>
                )}

                {result && (
                    <>
                        <div className="mx-3">
                            <b>Nome Comum:</b> {INFOS[result.prediction].nomecomum}
                        </div>

                        <div className="mx-3">
                            <b>Nome Científico:</b> <span className="italic">{INFOS[result.prediction].nomecientifico}</span>
                        </div>

                        <div className="mx-3">
                            <b>Familia:</b> {INFOS[result.prediction].familia}
                        </div>
                        <Details title="Importância" content={INFOS[result.prediction].importancia} />
                        <Details title="Manejo" content={INFOS[result.prediction].manejo} />
                        <Details title="Tipo de folha" content={INFOS[result.prediction].folha} />
                        <Details title="Plântula" content={INFOS[result.prediction].plantula} />
                        <Details title="Caule" content={INFOS[result.prediction].caule} />
                        <Details title="Época de ocorrência" content={INFOS[result.prediction].epoca} />
                        <Details title="Principais culturas afetadas" content={INFOS[result.prediction].culturas} />
                        <Details title="Doenças relacionadas" content={INFOS[result.prediction].doencas} />

                    </>
                )}
            </div>
        </div>
    );
}

export default PlantRecognition;