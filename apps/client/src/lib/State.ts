import create, { State } from 'zustand'
import { LoginResponse } from './types/LoginResponse'
import { persist } from 'zustand/middleware'

export const userInitialValues: LoginResponse = {
  serviceData: '',
  userAvailability: '',
  sessionTokenBck: '',
  firstName: '',
  lastName: '',
  email: '',
  active: false,
  passwordHash: '',
  sessionTokenWeb: '',
  phoneNumber: '',
  agreedToTermsOfUse: false,
  whereKnownUs: '',
  lastLogin: 0,
  sessionTokenCli: '',
  sessionTokenPro: '',
  funds: 0,
  tokenFacebook: '',
  tokenGoogle: '',
  tokensIonic: '',
  photoPath: '',
  photoExt: '',
  userRole: {
    userRole: '',
    description: '',
    fatherUserRole: '',
    domain: '',
    estatus: 0,
    defaultNamespace: '',
    id: 0,
  },
  sync: 0,
  usedCodeList: '',
  referrer: '',
  rut: '',
  domain: '',
  typeProfessional: '',
  tutenSubRole: '',
  userId: 0,
  appVersion: '',
  estatus: 0,
}

interface AppState extends State {
  user: LoginResponse
  setUser: (user: LoginResponse) => void
}

export const useStore = create<AppState>(
  persist(
    set => ({
      user: userInitialValues,
      setUser: (user: LoginResponse) => set(_state => ({ user })),
    }),
    {
      name: 'app-storage', // unique name
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    },
  ),
)
