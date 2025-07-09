import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import CustomSelect from '../../components/custom-select/index'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Component/CustomSelect',
  component: CustomSelect,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: { control: { type: 'text' }, defaultValue: '', description: 'value of input' },
    sx: {
      description: 'styled of select',
      control: {
        type: 'object'
      },
      defaultValue: {
        width: '200px'
      },
      table: {
        type: { summary: 'SxProps' }
      }
    },
    fullWidth: {
      description: 'width of select',
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    multiple: {
      description: 'multiple of select',
      control: { type: 'boolean' },
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    placeholder: { control: { type: 'text' }, defaultValue: 'Enter input', description: 'placeholder of input' },
    options: {
      description: 'list option of select',
      control: { type: 'object' },
      defaultValue: [{ label: 'option1', value: '1' }],
      table: {
        type: {
          summary: 'Array<{ label: string; value: string }>'
        }
      }
    },
    variant: {
      description: 'variant of Select (MUI)',
      control: { type: 'radio' },
      options: ['outlined', 'filled', 'standard'],
      defaultValue: 'outlined',
      table: {
        type: { summary: `outlined | filled | standard` },
        defaultValue: { summary: 'outlined' }
      }
    },
    onChange: {
      description: 'handle onChangeSelect',
      action: 'changed',
      table: {
        type: {
          summary: '(value: string | string[]) => void'
        }
      },
      control: false
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onChange: fn() }
} satisfies Meta<typeof CustomSelect>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SingleSelect: Story = {
  args: {
    value: '',
    sx: {
      width: '200px'
    },
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ],
    placeholder: 'select one value'
  }
}

export const MultipleSelect: Story = {
  args: {
    multiple: true,
    value: ['1', '2'],
    sx: {
      width: '200px'
    },
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' }
    ],
    placeholder: 'select multiple value'
  }
}

export const WithCustomStyle: Story = {
  args: {
    sx: {
      width: '200px',
      borderRadius: '12px !important',
      backgroundColor: '#f0f0f0',
      color: 'red'
    },
    placeholder: 'With Custom Style',
    value: '',
    options: [
      { label: 'Custom 1', value: 'c1' },
      { label: 'Custom 2', value: 'c2' }
    ]
  }
}

export const OutlinedVariant: Story = {
  args: {
    variant: 'outlined',
    sx: {
      width: '200px'
    },
    placeholder: 'Outlined',
    options: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' }
    ]
  }
}

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    sx: {
      width: '200px'
    },
    placeholder: 'Filled',
    options: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' }
    ]
  }
}

export const StandardVariant: Story = {
  args: {
    variant: 'standard',
    sx: {
      width: '200px'
    },
    placeholder: 'Standard',
    options: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' }
    ]
  }
}
