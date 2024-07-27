import React from "react";
import { TextField, MenuItem, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/pt-br";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
import {
  ButtonComponent,
  Container,
  ContainerForm,
  AlertError,
} from "./formStyles";
import dayjs from "dayjs";
import { getApi } from "../../utils/api";
import { updateClient } from "../../services/updateClient";
import { createClient } from "../../services/createClient";

const schema = yup
  .object()
  .shape({
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
    birthDate: yup
      .date()
      .required("Data de Nascimento é obrigatória")
      .typeError("Data inválida"),
    gender: yup.string().required("Gênero é obrigatório"),
    notes: yup.string(),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

interface FormComponentProps {
  client?: FormData;
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
  const queryClient = useQueryClient();
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
      birthDate: client?.birthDate ? dayjs(client.birthDate) : undefined,
      gender: client?.gender || "",
      notes: client?.notes || "",
    },
  });

  const createMutation = useMutation(createClient, {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      reset();
      closeModal();
      getAllClients();
    },
  });

  const updateMutation = useMutation(
    ({ id, data }: { id: number; data: FormData }) => updateClient(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clients");
        reset();
        closeModal();
        getAllClients();
      },
    }
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isEdit && client?.id) {
      updateMutation.mutate({ id: client.id, data });
    } else {
      createMutation.mutate(data);
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
            <div>
              <TextField
                label="Nome Completo"
                fullWidth
                {...register("name")}
              />
              <AlertError>{errors.name?.message}</AlertError>
            </div>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="pt-br"
            >
              <Controller
                name="birthDate"
                control={control}
                defaultValue={
                  client?.birthDate
                    ? dayjs(client.birthDate).toDate()
                    : undefined
                }
                render={({ field }) => (
                  <div>
                    <DatePicker
                      label="Data de Nascimento"
                      {...field}
                      format="DD/MM/YYYY"
                      sx={{
                        width: "100%",
                      }}
                    />
                    <AlertError>{errors.birthDate?.message}</AlertError>
                  </div>
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="gender"
              control={control}
              defaultValue={client?.gender || ""}
              render={({ field }) => (
                <div>
                  <TextField select fullWidth label="Sexo" {...field}>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Outro">Outro</MenuItem>
                  </TextField>
                  <AlertError>{errors.gender?.message}</AlertError>
                </div>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <div>
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register("email")}
              />
              <AlertError>{errors.email?.message}</AlertError>
            </div>
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="phone"
              control={control}
              defaultValue={client?.phone || ""}
              render={({ field }) => (
                <div>
                  <InputMask
                    mask="(99) 99999-9999"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {(inputProps) => (
                      <TextField {...inputProps} label="Telefone" fullWidth />
                    )}
                  </InputMask>
                  <AlertError>{errors.phone?.message}</AlertError>
                </div>
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="zip"
              control={control}
              defaultValue={client?.zip || ""}
              render={({ field }) => (
                <div>
                  <InputMask
                    mask="99999-999"
                    {...field}
                    onBlur={(e) => {
                      field.onBlur(e);
                      handleCepBlur(e);
                    }}
                  >
                    {(inputProps) => (
                      <TextField {...inputProps} label="CEP" fullWidth />
                    )}
                  </InputMask>
                  <AlertError>{errors.zip?.message}</AlertError>
                </div>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <div>
              <TextField label="Rua" fullWidth {...register("street")} />
              <AlertError>{errors.street?.message}</AlertError>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div>
              <TextField label="Número" fullWidth {...register("number")} />
              <AlertError>{errors.number?.message}</AlertError>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <TextField
                label="Complemento"
                fullWidth
                {...register("complement")}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <TextField
                label="Bairro"
                fullWidth
                {...register("neighborhood")}
              />
              <AlertError>{errors.neighborhood?.message}</AlertError>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <TextField label="Cidade" fullWidth {...register("city")} />
              <AlertError>{errors.city?.message}</AlertError>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <TextField label="Estado" fullWidth {...register("state")} />
              <AlertError>{errors.state?.message}</AlertError>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <TextField
                label="Observações"
                fullWidth
                multiline
                rows={4}
                {...register("notes")}
              />
            </div>
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
