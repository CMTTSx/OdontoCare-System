import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

import api from "../services/api";

import BasicLayout from "../Layout/BasicLayout/BasicLayout";
import Breadcrumbs from "../Layout/Breadcrumbs/Agenda";
import AgendamentoPopover from "../Layout/AgendamentoPopover";
import AgendarAtendimentoModal from "../Layout/AgendarAtendimentoModal";
import EditarAgendamentoModal from "../Layout/EditarAgendamentoModal";

import { Agendamento } from "../types/Agendamento";

// Interface para o formato que vem da API
interface AgendamentoAPI {
  id: number;
  fullName: string;
  dataAgendamento: string;
  horarioAgendamento: string;
  pacienteId?: number;
  status?: string;
}

export default function Agenda() {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);

  const [editarOpen, setEditarOpen] = useState(false);
  const [novoOpen, setNovoOpen] = useState(false);
  const [cancelarOpen, setCancelarOpen] = useState(false); // Modal de confirmação de cancelamento
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);
  const [agendamentoParaCancelar, setAgendamentoParaCancelar] = useState<Agendamento | null>(null); // Agendamento a ser cancelado

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const buscarAgendamentos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get<AgendamentoAPI[]>("/agendamentos");

      const agendamentosFormatados: Agendamento[] = response.data.map((item) => ({
        id: item.id,
        data: item.dataAgendamento,
        hora: item.horarioAgendamento,
        status: item.status || "AGENDADO",
        paciente: {
          id: item.pacienteId || item.id,
          fullName: item.fullName
        }
      }));

      setAgendamentos(agendamentosFormatados);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarAgendamentos();
  }, [buscarAgendamentos]);

  const agendamentosFiltrados = agendamentos.filter((ag) =>
    value ? dayjs(ag.data).isSame(value, "day") : false
  );

  // Abrir modal de confirmação de cancelamento
  const handleAbrirCancelar = (ag: Agendamento) => {
    setAgendamentoParaCancelar(ag);
    setCancelarOpen(true);
  };

  // Fechar modal de cancelamento
  const handleFecharCancelar = () => {
    setCancelarOpen(false);
    setAgendamentoParaCancelar(null);
  };

  // Confirmar cancelamento
  const handleConfirmarCancelar = async () => {
    if (!agendamentoParaCancelar) return;

    try {
      await api.delete(`/agendamentos/${agendamentoParaCancelar.id}`);
      setAgendamentos((prev) => prev.filter((ag) => ag.id !== agendamentoParaCancelar.id));
      handleFecharCancelar();
    } catch (error) {
      console.error("Erro ao cancelar:", error);
    }
  };

  const handleEditar = (ag: Agendamento) => {
    setSelectedAgendamento(ag);
    setEditarOpen(true);
  };

  const handleAbrirNovo = () => {
    setNovoOpen(true);
  };

  const handleFecharNovo = () => {
    setNovoOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CANCELADO': return '#f44336';
      case 'CONFIRMADO': return '#4caf50';
      case 'PENDENTE': return '#ff9800';
      case 'REALIZADO': return '#2196f3';
      default: return '#4caf50';
    }
  };

  const formatDateBR = (data: string) => {
    if (!data) return "";
    return dayjs(data).format("DD/MM/YYYY");
  };

  return (
    <BasicLayout>
      <Breadcrumbs />

      <Box sx={{ mt: 2, maxWidth: 900, mx: "auto" }}>
        <Typography
          sx={{
            fontSize: { xs: 22, md: 30 },
            fontWeight: 700,
            textAlign: "center",
          }}
        >
        </Typography>

        {/* DATA */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-start", mx: "-20%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <Stack spacing={2} width="14rem">
              <DesktopDatePicker
                label="Data"
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>

        {/* LISTA DE AGENDAMENTOS */}
        <Box sx={{ mt: 4 }}>
          {loading && <Typography align="center">Carregando...</Typography>}

          {!loading && agendamentosFiltrados.length === 0 && (
            <Typography align="center">
              Nenhum agendamento para esta data.
            </Typography>
          )}

          {agendamentosFiltrados.map((ag) => (
            <Box
              key={ag.id}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #d9d9d9",
                borderRadius: 2,
                backgroundColor: "#fafafa",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Typography fontWeight={700} color="#0053d9">
                  {ag.hora}
                </Typography>

                <Typography fontWeight={500}>
                  {ag.paciente?.fullName || "Paciente não encontrado"}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: getStatusColor(ag.status),
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    ml: 2,
                    fontWeight: 600,
                    fontSize: '0.7rem'
                  }}
                >
                  {ag.status || 'AGENDADO'}
                </Typography>
              </Box>

              <AgendamentoPopover
                agendamento={ag}
                onCancelar={() => handleAbrirCancelar(ag)} // Agora abre o modal de confirmação
                onEditar={() => handleEditar(ag)}
              />
            </Box>
          ))}
        </Box>

        {/* BOTÃO NOVO AGENDAMENTO */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleAbrirNovo}
            sx={{
              backgroundColor: "#0053d9",
              "&:hover": { backgroundColor: "#0042b3" },
              px: 4,
              py: 1,
              fontWeight: 600
            }}
          >
            NOVO AGENDAMENTO
          </Button>
        </Box>
      </Box>

      {/* MODAL DE CONFIRMAÇÃO DE CANCELAMENTO */}
      <Dialog
        open={cancelarOpen}
        onClose={handleFecharCancelar}
        aria-labelledby="cancelar-dialog-title"
        aria-describedby="cancelar-dialog-description"
      >
        <DialogTitle id="cancelar-dialog-title" sx={{ fontWeight: 600 }}>
          Confirmar Cancelamento
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="cancelar-dialog-description">
            Tem certeza que deseja cancelar o agendamento de{' '}
            <strong>{agendamentoParaCancelar?.paciente?.fullName}</strong>{' '}
            <strong>{formatDateBR(agendamentoParaCancelar?.data || '')}</strong> às{' '}
            <strong>{agendamentoParaCancelar?.hora}h</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleFecharCancelar}
            variant="outlined"
            sx={{
              color: "#666",
              borderColor: "#ccc",
              "&:hover": {
                borderColor: "#999",
                backgroundColor: "#f5f5f5"
              }
            }}
          >
            Não, Voltar
          </Button>
          <Button
            onClick={handleConfirmarCancelar}
            variant="contained"
            sx={{
              backgroundColor: "#EF4444",
              "&:hover": { backgroundColor: "#db0b00" },
              fontWeight: 600
            }}
          >
            Sim, Cancelar Agendamento
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL DE EDIÇÃO */}
      <EditarAgendamentoModal
        open={editarOpen}
        onClose={() => setEditarOpen(false)}
        agendamento={selectedAgendamento}
        onAtualizado={buscarAgendamentos}
      />

      {/* MODAL DE NOVO AGENDAMENTO */}
      <AgendarAtendimentoModal
        open={novoOpen}
        onClose={handleFecharNovo}
        onAtualizado={buscarAgendamentos}
      />
    </BasicLayout>
  );
}