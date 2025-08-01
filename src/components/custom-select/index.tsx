import {
  BaseSelectProps,
  Box,
  InputLabel,
  InputLabelProps,
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  styled
} from '@mui/material'
import { useTranslation } from 'react-i18next'

type TCustomSelect = BaseSelectProps & {
  options: { label: string; value: string }[]
  placeholder?: string
  fullWidth?: boolean
  onChange: (...event: any[]) => void
}

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    padding: '8px 8px 8px 8px !important',
    height: '38px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper
  },
  legend: {
    display: 'none'
  },
  svg: {
    top: 'calc(50% - .6em) !important'
  },
  '.MuiOutlinedInput-notchedOutline': {
    top: '-0px !important',
    bottom: '2px !important',
    height: '38px'
  }
}))

const CustomPlaceholder = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  left: '10px',
  zIndex: 2
}))

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({}))

const CustomSelect = (props: TCustomSelect) => {
  const { value, label, onChange, fullWidth, placeholder, options, ...rest } = props
  const { t } = useTranslation()

  return (
    <>
      <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
        {((Array.isArray(value) && !value.length) || !value) && <CustomPlaceholder>{placeholder}</CustomPlaceholder>}
        <StyledSelect fullWidth={fullWidth} value={value} label={label} onChange={onChange} {...rest}>
          {options?.length > 0 ? (
            options?.map(opt => (
              <StyledMenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </StyledMenuItem>
            ))
          ) : (
            <StyledMenuItem>{t('No_data')}</StyledMenuItem>
          )}
        </StyledSelect>
      </Box>
    </>
  )
}

export default CustomSelect
