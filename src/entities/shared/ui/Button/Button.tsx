import type { ButtonHTMLAttributes } from 'react'

import { Button as ButtonMaterial } from '@mui/material'

import type { ThemeButton } from '../model/enum'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
  isLoading?: boolean
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <ButtonMaterial
      variant='contained'
      sx={{
        bgcolor: 'info.main',
        borderRadius: 2,
        width: 120,
        height: { xs: 40, sm: 30, md: 50 },
        minWidth: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
      onClick={onClick}
    >
      {children}
    </ButtonMaterial>
  )
}
