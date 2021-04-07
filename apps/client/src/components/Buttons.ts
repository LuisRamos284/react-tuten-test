import styled from '@emotion/styled'
import { theme } from 'theme'

const Button = styled.button({
  borderRadius: 10,
  border: 'none',
  padding: 10,
  boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
  paddingInline: 20,
  color: 'white',
  background: theme.colors.primary,
  fontWeight: 'bold',
  margin: 'auto',
  marginTop: '1.5rem',
  fontSize: 14,
  cursor: 'pointer',
  ':focus': {
    outline: 'none',
  },
})

export const PrimaryButton = styled(Button)({
  background: theme.colors.primary,
})

export const SecondaryButton = styled(Button)({
  background: theme.colors.secondary,
})
