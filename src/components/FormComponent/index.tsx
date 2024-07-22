import React from "react";
import { TextField, MenuItem, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/pt-br";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
import { ButtonComponent, Container, ContainerForm } from "./formStyles";
import dayjs from "dayjs";
import { getApi } from "../../utils/api";
import { updateClient } from "../../services/updateClient";
import { createClient } from "../../services/createClient";

const schema = yup
  .object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    phone: yup.string().required("Telefone é obrigatório"),
    street: yup.string().required("Rua é obrigatória"),
    number: yup.string().required("Nº é obrigatório"),
    complement: yup.string(),
    neighborhood: yup.string().required("Bairro é obrigatório"),
    city: yup.string().required("Cidade é obrigatória"),
    state: yup.string().required("Estado é obrigatório"),
    zip: yup.string().required("CEP é obrigatório"),
    birthDate: yup.date().required("Data de nascimento é obrigatória"),
    gender: yup.string().required("Gênero é obrigatório"),
    notes: yup.string(),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

interface FormComponentProps {
  client?: Partial<FormData>;
  isEdit: boolean;
  closeModal: () => void;
  getAllClients: () => void;
}

export const FormComponent: React.FC<FormComponentProps> = ({
  client,
  isEdit,
  closeModal,
  getAllClients,
}) => {
  const api = getApi();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: client?.name || "",
      email: client?.email || "",
      phone: client?.phone || "",
      street: client?.street || "",
      number: client?.number || "",
      complement: client?.complement || "",
      neighborhood: client?.neighborhood || "",
      city: client?.city || "",
      state: client?.state || "",
      zip: client?.zip || "",
      birthDate: client?.birthDate ? dayjs(client.birthDate) : null,
      gender: client?.gender || "",
      notes: client?.notes || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (isEdit) {
        await updateClient(client!.id, data);
      } else {
        await createClient(data);
      }
    } catch (error) {
      console.error(`Erro ao ${isEdit ? "editar" : "cadastrar"} cliente:`, error);
    } finally {
      reset();
      closeModal();
      getAllClients();
    }
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const zip = e.target.value;
    if (zip.length === 9) {
      try {
        const response = await api.get(`https://viacep.com.br/ws/${zip}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;
        setValue("street", logradouro);
        setValue("neighborhood", bairro);
        setValue("city", localidade);
        setValue("state", uf);
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  return (
    <Container>
      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register("name")}
              label="Nome Completo"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              defaultValue={client?.name || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <Controller
                name="birthDate"
                control={control}
                defaultValue={client?.birthDate ? dayjs(client.birthDate) : null}
                render={({ field }) => (
                  <DatePicker
                    label="Data de Nascimento"
                    {...field}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors.birthDate}
                        helperText={errors.birthDate?.message}
                      />
                    )}
                    sx={{
                      width: "100%",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Sexo"
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              defaultValue={client?.gender || ""}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              defaultValue={client?.email || ""}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="phone"
              control={control}
              defaultValue={client?.phone || ""}
              render={({ field }) => (
                <InputMask
                  mask="(99) 99999-9999"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      label="Telefone"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                </InputMask>
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="zip"
              control={control}
              defaultValue={client?.zip || ""}
              render={({ field }) => (
                <InputMask
                  mask="99999-999"
                  {...field}
                  onBlur={(e) => {
                    field.onBlur(e);
                    handleCepBlur(e);
                  }}
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      label="CEP"
                      fullWidth
                      error={!!errors.zip}
                      helperText={errors.zip?.message}
                    />
                  )}
                </InputMask>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Rua"
              fullWidth
              {...register("street")}
              error={!!errors.street}
              helperText={errors.street?.message}
              defaultValue={client?.street || ""}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Número"
              fullWidth
              {...register("number")}
              error={!!errors.number}
              helperText={errors.number?.message}
              defaultValue={client?.number || ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Complemento"
              fullWidth
              {...register("complement")}
              defaultValue={client?.complement || ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Bairro"
              fullWidth
              {...register("neighborhood")}
              error={!!errors.neighborhood}
              helperText={errors.neighborhood?.message}
              defaultValue={client?.neighborhood || ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Cidade"
              fullWidth
              {...register("city")}
              error={!!errors.city}
              helperText={errors.city?.message}
              defaultValue={client?.city || ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Estado"
              fullWidth
              {...register("state")}
              error={!!errors.state}
              helperText={errors.state?.message}
              defaultValue={client?.state || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observações"
              fullWidth
              multiline
              rows={4}
              {...register("notes")}
              defaultValue={client?.notes || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonComponent type="submit">
              {isEdit ? "Salvar" : "Cadastrar"}
            </ButtonComponent>
          </Grid>
        </Grid>
      </ContainerForm>
    </Container>
  );
};
