import { useAI } from "./hooks/useAI";
import AIDropzone from "./components/AIDropzone";
import AIResultCard from "./components/AIResultCard";

const AIPage = () => {
  const { result, loading, uploadFile } = useAI();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">

      <h2 className="text-2xl font-bold">
        AI Invoice OCR
      </h2>

      <AIDropzone
        uploadFile={uploadFile}
        loading={loading}
      />

      {result && <AIResultCard data={result} />}

    </div>
  );
};

export default AIPage;