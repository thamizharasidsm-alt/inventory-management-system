import { useToast } from '../../context/InventoryContext';

export default function Toast() {
  const { toast } = useToast();
  return (
    <div className={`toast ${toast.type} ${toast.visible ? 'show' : ''}`}>
      {toast.msg}
    </div>
  );
}
