import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import TextField from '../../components/text-field/index'
// import TextField from '@mui/material/TextField'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Component/TextField',
  component: TextField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: { control: { type: 'text' }, defaultValue: '', description: 'value of input' },
    placeholder: { control: { type: 'text' }, defaultValue: 'Enter input', description: 'placeholder of input' },
    onChange: {
      description: 'handle onChangeTextField',
      action: 'onChange',
      table: {
        type: {
          summary: '(value: string) => void'
        }
      },
      control: false
    },
    helperText: { control: { type: 'text' }, defaultValue: '', description: 'helperText of input' },
    color: {
      description: 'theme of input',
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'error'],
      defaultValue: 'primary',
      table: {
        type: { summary: 'primary | secondary | info | success | warning | error' },
        defaultValue: { summary: 'primary' }
      }
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { value: '', placeholder: 'Enter input', helperText: '', color: 'primary', onChange: fn() }
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}

export const PlaceholderTextfield: Story = {
  args: {
    placeholder: 'Enter input',
    value: ''
  }
}

export const ValueTextfield: Story = {
  args: {
    placeholder: 'Enter input',
    value: 'Json Nguyen'
  }
}

export const WithHelperText: Story = {
  args: {
    helperText: 'This is a helper text'
  }
}

export const SuccessTheme: Story = {
  args: {
    color: 'success',
    placeholder: 'Success input'
  }
}

export const ErrorTheme: Story = {
  args: {
    color: 'error',
    helperText: 'This field is required'
  }
}
