import PrimaryButton from "../PrimaryButton/PrimaryButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
}

export default function Modal({ isOpen, onClose, onJoin }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="montserrat-regular w-[600px] rounded-lg bg-white p-12 text-center shadow-lg">
        <h5 className="mb-3 text-2xl">Would you like to join this ensemble?</h5>
        <p className="mb-12 text-gray-500">
          By joining this ensemble you will be able to chat with other members
          and participate in events.
        </p>
        <div className="flex justify-around">
          <PrimaryButton onClick={onJoin} size="large" color="blue">
            Join
          </PrimaryButton>
          <PrimaryButton onClick={onClose} size="large" color="white">
            Close
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
