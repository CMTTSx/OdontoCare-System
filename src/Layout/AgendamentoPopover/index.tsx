import { Button } from "@mui/material";
import { Agendamento } from "../../types/Agendamento";

interface Props {
  agendamento: Agendamento;
  onCancelar: (id: number) => void;
  onEditar: () => void;
}

export default function AgendamentoPopover({
  agendamento,
  onCancelar,
  onEditar,
}: Props) {
  return (
    <div>
      <Button onClick={onEditar}>Editar</Button>

      <Button color="error" onClick={() => onCancelar(agendamento.id)}>
        Cancelar
      </Button>
    </div>
  );
}