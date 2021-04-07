import { string, object, SchemaOf } from 'yup'

export type LoginPayload = {
  email: string
  password: string
}

export const LoginInitialValues = {
  email: '',
  password: '',
}

export const LoginSchema: SchemaOf<LoginPayload> = object({
  email: string()
    .email('Debe ingresar un email valido')
    .required('El email es obligatorio'),
  password: string().required('La Contraseña es obligatoria'),
})
