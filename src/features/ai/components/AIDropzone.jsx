const AIDropzone = ({ uploadFile, loading }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="border-2 border-dashed p-10 rounded-2xl text-center">

      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={handleChange}
      />

      {loading && (
        <p className="mt-4 text-indigo-600">
          Processing...
        </p>
      )}
    </div>
  );
};

export default AIDropzone;