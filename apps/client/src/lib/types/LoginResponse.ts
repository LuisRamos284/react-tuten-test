export interface LoginResponse {
  serviceData?: any
  userAvailability?: any
  sessionTokenBck: string
  firstName: string
  lastName: string
  email: string
  active: boolean
  passwordHash?: any
  sessionTokenWeb?: any
  phoneNumber: string
  agreedToTermsOfUse: boolean
  whereKnownUs?: any
  lastLogin: number
  sessionTokenCli?: any
  sessionTokenPro?: any
  funds: number
  tokenFacebook?: any
  tokenGoogle?: any
  tokensIonic?: any
  photoPath?: any
  photoExt?: any
  userRole: UserRole
  sync: number
  usedCodeList: string
  referrer: string
  rut?: any
  domain: string
  typeProfessional?: any
  tutenSubRole?: any
  userId?: any
  appVersion?: any
  estatus?: any
}

interface UserRole {
  userRole: string
  description: string
  fatherUserRole?: any
  domain: string
  estatus?: any
  defaultNamespace?: any
  id: number
}
