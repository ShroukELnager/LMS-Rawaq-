import Select, { components } from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { AlignLeft, CheckCircle2, CheckSquare } from 'lucide-react';

const options = [
  {
    value: 'single_choice',
    label: 'Single Choice',
    icon: CheckCircle2,
    short: 'MCQ',
  },
  {
    value: 'multiple_choice',
    label: 'Multiple Choice',
    icon: CheckSquare,
  },
  {
    value: 'text',
    label: 'Text Answer',
    icon: AlignLeft,
  },
];

const Option = (props: any) => {
  const { icon: Icon, short } = props.data;

  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon
            size={18}
            className={
              props.isFocused || props.isSelected
                ? 'text-white'
                : 'text-primary'
            }
          />

          <span
            className={`font-medium ${
              props.isFocused || props.isSelected
                ? 'text-white'
                : 'text-primary'
            }`}
          >
            {props.data.label}
          </span>
        </div>

        {short && (
          <span
            className={`text-xs font-semibold ${
              props.isFocused || props.isSelected
                ? 'text-white/70'
                : 'text-primary/70'
            }`}
          >
            {short}
          </span>
        )}
      </div>
    </components.Option>
  );
};

export default function QuestionTypeSelector({ index }: { index: number }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={`p_questions.${index}.question_type`}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          components={{ Option }}
          value={options.find((o) => o.value === field.value)}
          onChange={(option) => field.onChange(option?.value)}
          menuPortalTarget={
            typeof window !== 'undefined' ? document.body : undefined
          }
          menuPosition="fixed"
          isSearchable={false}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 99999,
            }),

            container: (base) => ({
              ...base,
              width: '100%',
            }),

            control: (base) => ({
              ...base,
              minHeight: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: '#E6E3D0',
              border: 'none',
              boxShadow: 'none',
              cursor: 'pointer',

              '&:hover': {
                border: 'none',
              },
            }),

            valueContainer: (base) => ({
              ...base,
              paddingLeft: 10,
            }),

            singleValue: (base) => ({
              ...base,
              color: 'var(--color-primary)',
              fontWeight: 600,
            }),

            placeholder: (base) => ({
              ...base,
              color: 'var(--color-primary)',
            }),

            indicatorSeparator: () => ({
              display: 'none',
            }),

            dropdownIndicator: (base) => ({
              ...base,
              color: 'var(--color-primary)',

              '&:hover': {
                color: 'var(--color-primary)',
              },
            }),

            menu: (base) => ({
              ...base,
              overflow: 'hidden',
              borderRadius: 12,
              marginTop: 6,
              boxShadow: '0 12px 30px rgba(15,23,42,.18)',
            }),

            menuList: (base) => ({
              ...base,
              padding: 4,
            }),

            option: (base, state) => ({
              ...base,
              padding: '12px 16px',
              margin: '4px',
              borderRadius: 8,
              cursor: 'pointer',
              backgroundColor:
                state.isFocused || state.isSelected ? '#0F7778' : '#fff',
              color:
                state.isFocused || state.isSelected
                  ? '#fff'
                  : 'var(--color-primary)',

              ':active': {
                backgroundColor: '#0F7778',
              },
            }),
          }}
          formatOptionLabel={(option, meta) => {
            if (meta.context === 'menu') {
              return option.label;
            }

            const Icon = option.icon;

            return (
              <div className="flex items-center gap-2">
                <Icon size={18} className="text-primary" />

                <span className="font-semibold text-primary">
                  {option.label}
                </span>
              </div>
            );
          }}
        />
      )}
    />
  );
}
