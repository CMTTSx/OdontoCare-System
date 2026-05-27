import * as React from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";

import { Agendamento } from "../../types/Agendamento";
import api from "../../services/api";

interface Cliente {
  id: number;
  fullName: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  agendamento: Agendamento | null;
  onAtualizado: () => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #028be6",
  borderRadius: 1,
  boxShadow: 2,
  p: 4,
  width: 400,
};

export default function EditarAgendamentoModal({
  open,
  onClose,
  agendamento,
  onAtualizado,
}: Props) {
  const [clientes, setClientes] = React.useState<Cliente[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [clienteSelecionado, setClienteSelecionado] = React.useState<Cliente | null>(null);
  const [busca, setBusca] = React.useState("");
  const [dataSelecionada, setDataSelecionada] = React.useState("");
  const [horaSelecionada, setHoraSelecionada] = React.useState("");

  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackError, setSnackError] = React.useState(false);

  // Preencher dados quando o modal abre ou agendamento muda
  React.useEffect(() => {
    if (agendamento && agendamento.paciente) {
      setClienteSelecionado(agendamento.paciente);
      setDataSelecionada(agendamento.data || "");
      setHoraSelecionada(agendamento.hora || "");

      // Se tiver nome do paciente, preencher a busca também
      if (agendamento.paciente.fullName) {
        setBusca(agendamento.paciente.fullName);
      }
    }
  }, [agendamento]);

  // Resetar quando o modal fecha
  React.useEffect(() => {
    if (!open) {
      setClienteSelecionado(null);
      setDataSelecionada("");
      setHoraSelecionada("");
      setBusca("");
      setClientes([]);
    }
  }, [open]);

  // Buscar clientes
  const buscarClientes = async (nome: string) => {
    if (!nome || nome.length < 2) {
      setClientes([]);
      return;
    }

    const token = sessionStorage.getItem("@airbnb-Token");

    try {
      setLoading(true);
      const response = await api.get("/clientes", {
        params: { fullName: nome },
        headers: { Authorization: `Bearer ${token}` },
      });

      setClientes(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setClientes([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const delay = setTimeout(() => {
      buscarClientes(busca);
    }, 400);

    return () => clearTimeout(delay);
  }, [busca]);

  const handleAtualizar = async () => {
    if (!agendamento || !clienteSelecionado) {
      setSnackError(true);
      return;
    }

    try {
      const token = sessionStorage.getItem("@airbnb-Token");

      await api.put(
        `/agendamentos/${agendamento.id}`,
        {
          clienteId: clienteSelecionado.id,
          data: dataSelecionada,
          hora: horaSelecionada,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSnackOpen(true);
      await onAtualizado();
      onClose();
    } catch (error: any) {
      console.error(
        "Erro ao atualizar:",
        error.response?.data || error.message
      );
      setSnackError(true);
    }
  };

  // Verifica se o cliente atual está na lista de opções
  const clienteExisteNaLista = React.useMemo(() => {
    if (!clienteSelecionado) return false;
    return clientes.some(c => c.id === clienteSelecionado.id);
  }, [clientes, clienteSelecionado]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography
            sx={{ fontWeight: 600, fontSize: 20, textAlign: "center" }}
          >
            Editar Agendamento
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Autocomplete
              options={clientes}
              getOptionLabel={(option) => option?.fullName || ""}
              value={clienteSelecionado}
              loading={loading}
              isOptionEqualToValue={(option, value) =>
                option?.id === value?.id
              }
              noOptionsText={
                busca.length < 3
                  ? "Digite pelo menos 3 letras"
                  : "Nenhum paciente encontrado"
              }
              loadingText="Carregando..."
              clearText="Limpar"
              openText="Abrir"
              closeText="Fechar"
              onChange={(event, newValue) => {
                setClienteSelecionado(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setBusca(newInputValue);
              }}
              // Força a atualização das opções quando o cliente selecionado muda
              filterOptions={(options, state) => options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Paciente"
                  fullWidth
                  placeholder="Digite para buscar..."
                />
              )}
            />

            {/* Debug - remover depois */}
            {process.env.NODE_ENV === 'development' && (
              <Typography variant="caption" color="text.secondary">
                Cliente selecionado: {clienteSelecionado?.fullName || 'nenhum'} |
                Na lista: {clienteExisteNaLista ? 'sim' : 'não'} |
                Total clientes: {clientes.length}
              </Typography>
            )}

            <Box sx={{ mt: 2 }}>
              <TextField
                type="date"
                fullWidth
                label="Data"
                value={dataSelecionada || ""}
                onChange={(e) => setDataSelecionada(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <TextField
                type="time"
                fullWidth
                label="Hora"
                value={horaSelecionada || ""}
                onChange={(e) => setHoraSelecionada(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                backgroundColor: "#EF4444",
                color: "#fff",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#db0b00" },
              }}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleAtualizar}
              disabled={!clienteSelecionado || !dataSelecionada || !horaSelecionada}
              sx={{
                backgroundColor: "#4DEA80",
                color: "#fff",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#22c55e" },
                "&.Mui-disabled": {
                  backgroundColor: "#ccc",
                  color: "#666"
                }
              }}
            >
              Salvar Alterações
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* 🔵 SUCESSO */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSnackOpen(false)}
        >
          Agendamento editado com sucesso!
        </Alert>
      </Snackbar>

      {/* 🔴 ERRO */}
      <Snackbar
        open={snackError}
        autoHideDuration={3000}
        onClose={() => setSnackError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setSnackError(false)}
        >
          {!clienteSelecionado
            ? "Selecione um paciente"
            : "Erro ao atualizar agendamento"}
        </Alert>
      </Snackbar>
    </>
  );
}
