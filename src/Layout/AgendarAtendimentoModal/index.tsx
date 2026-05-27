import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import api from "../../services/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onAtualizado: () => void;
}

interface Cliente {
  id: number;
  fullName: string;
}

export default function NovoAgendamentoModal({ open, onClose, onAtualizado }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [busca, setBusca] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  // Buscar clientes
  const buscarClientes = async (nome: string) => {
    if (!nome || nome.length < 3) {
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
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce para busca
  React.useEffect(() => {
    const delay = setTimeout(() => {
      buscarClientes(busca);
    }, 400);
    return () => clearTimeout(delay);
  }, [busca]);

  const handleSalvar = async () => {
    if (!clienteSelecionado || !data || !hora) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const token = sessionStorage.getItem("@airbnb-Token");

      await api.post(
        "/agendamentos",
        {
          clienteId: clienteSelecionado.id,
          data: data,
          hora: hora,
          status: "AGENDADO"
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onAtualizado();
      onClose();

      // Limpar campos
      setClienteSelecionado(null);
      setData("");
      setHora("");
      setBusca("");
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <Typography variant="h6" mb={2} textAlign="center" fontWeight={600}>
          Novo Agendamento
        </Typography>

        <Autocomplete
          options={clientes}
          getOptionLabel={(option) => option.fullName}
          value={clienteSelecionado}
          loading={loading}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          noOptionsText={
            busca.length < 3
              ? "Digite pelo menos 3 letras"
              : "Nenhum paciente encontrado"
          }
          onChange={(_, newValue) => setClienteSelecionado(newValue)}
          onInputChange={(_, newInputValue) => setBusca(newInputValue)}
          renderInput={(params) => (
            <TextField {...params} label="Paciente" fullWidth />
          )}
        />

        <Box sx={{ mt: 2 }}>
          <TextField
            type="date"
            label="Data"
            fullWidth
            value={data}
            onChange={(e) => setData(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            type="time"
            label="Hora"
            fullWidth
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
          <Button color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSalvar}
            disabled={!clienteSelecionado || !data || !hora}
            sx={{
              color: "#fff",
              backgroundColor: "#08bf36",
              "&:hover": { backgroundColor: "#029527" },
            }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}