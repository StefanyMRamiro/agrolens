import { useState } from "react";
import ImagePicker from "./ImagePicker";
import Button from "./Button";
import axios from "axios";

interface AnalyzeData {
  confidence: number;
  filename: string;
  prediction: string;
}

function App() {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [result, setResult] = useState<AnalyzeData>();

  const analyzePlant = async () => {
    if (!selectedImage) return;

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
  };

  return (
    <div className="bg-lime-900 w-screen min-h-screen items-center text-white">
      <div className="bg-lime-600 w-full flex justify-center items-center ">
        <img
          className="p-1"
          alt="app"
          width="32px"
          height="32px"
          src="/logo.svg"
        />

        <p className="font-semibold">AgroLens</p>

        <div className="flex-1"></div>
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        {selectedImage ? (
          <div className="p-2">
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
                }}
              />

              <Button
                label="Identificar"
                onClick={() => {
                  analyzePlant();
                }}
              />
            </div>
          </div>
        ) : (
          <div className="mt-20 w-full">
            <ImagePicker setSelectedImage={setSelectedImage} />
          </div>
        )}

        {result && (
          <>
            <div className="text-lg">
              Resultado: <b>{result.prediction}</b>
            </div>

            <div className="italic text-sm">
              Confiança: ~{Math.round(result.confidence * 100)}%
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
