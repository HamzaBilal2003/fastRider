import React, { useState } from 'react';
import { Edit, X } from 'lucide-react';

interface Document {
  type: 'image' | 'video';
  title: string;
  url: string;
}

interface DocumentViewerProps {
  documents: Document[];
}

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000046] bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="relative max-w-4xl w-full mx-4 flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 cursor-pointer"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-8 bg-gray-200 px-8 rounded-t-lg py-4">Documents</h2>
      <div className="space-y-8 p-8">
        {documents.map((doc, index) => (
          <div key={index}>
            <h3 className="text-xl mb-4">{doc.title}</h3>
            <div
              className="bg-gray-100 rounded-xl p-4 relative cursor-pointer group"
              onClick={() => setSelectedDoc(doc)}
            >
              {doc.type === 'image' ? (
                <img
                  src={doc.url}
                  alt={doc.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="relative">
                  <video
                    src={doc.url}
                    controls={false}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              )}
              <button className="absolute bottom-6 right-6 p-2 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDoc && <Modal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
      >
        {selectedDoc?.type === 'image' ? (
          <img
            src={selectedDoc.url}
            alt={selectedDoc.title}
            className="w-[50%] max-h-[50vh] object-contain rounded-lg"
          />
        ) : (
          <video
            src={selectedDoc.url}
            controls
            className="w-[50%] max-h-[50vh] rounded-lg"
          />
        )}
      </Modal>}
    </div>
  );
};

export default DocumentViewer;