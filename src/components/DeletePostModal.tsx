import { FC } from "react";

interface DeletePostModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeletePostModal: FC<DeletePostModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm text-black">
        <h2 className="text-base sm:text-lg font-semibold mb-2">
          Please confirm if you wish to delete the post
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete the post? <br />
          <strong>Once deleted, it cannot be recovered.</strong>
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
