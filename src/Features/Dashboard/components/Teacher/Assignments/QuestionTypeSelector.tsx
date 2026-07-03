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
            size={20}
            className={props.isFocused ? 'text-white' : 'text-slate-600'}
          />

          <span
            className={`font-medium ${
              props.isFocused ? 'text-white' : 'text-slate-700'
            }`}
          >
            {props.data.label}
          </span>
        </div>

        {short && (
          <span
            className={`text-xs font-semibold ${
              props.isFocused ? 'text-white/70' : 'text-slate-400'
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
          components={{
            Option,
          }}
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

            control: (base, state) => ({
              ...base,
              minHeight: 48,
              height: 48,
              borderRadius: 12,
              borderColor: '#D9E2F2',
              boxShadow: 'none',
              cursor: 'pointer',
              paddingLeft: 6,
              backgroundColor: '#fff',

              '&:hover': {
                borderColor: '#D9E2F2',
              },
            }),

            valueContainer: (base) => ({
              ...base,
              paddingLeft: 6,
            }),

            singleValue: (base) => ({
              ...base,
              color: '#0F172A',
              fontWeight: 600,
            }),

            indicatorSeparator: () => ({
              display: 'none',
            }),

            dropdownIndicator: (base) => ({
              ...base,
              color: '#64748B',

              '&:hover': {
                color: '#64748B',
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
              padding: 0,
            }),

            option: (base, state) => ({
              ...base,
              padding: '14px 16px',
              cursor: 'pointer',
              backgroundColor: state.isFocused ? '#0F7778' : '#fff',
              color: state.isFocused ? '#fff' : '#334155',

              ':active': {
                backgroundColor: '#0F7778',
              },
            }),
          }}
          formatOptionLabel={(option, meta) => {
            if (meta.context === 'menu') {
              return option.label;
            }

            return (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500">
                  Type:
                </span>

                <span className="font-semibold text-slate-800">
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
