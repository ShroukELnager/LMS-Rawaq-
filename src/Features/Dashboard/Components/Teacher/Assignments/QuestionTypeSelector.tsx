'use client';

import { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import {
  AlignLeft,
  CheckCircle2,
  CheckSquare,
  type LucideIcon,
} from 'lucide-react';

type QuestionType = 'text' | 'single_choice' | 'multiple_choice';

type QuestionTypeOption = {
  value: QuestionType;
  label: string;
  icon: LucideIcon;
  short?: string;
};

const options: readonly QuestionTypeOption[] = [
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
      <div className="flex min-w-0 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <Icon
            size={18}
            className={
              props.isFocused || props.isSelected
                ? 'shrink-0 text-white'
                : 'shrink-0 text-primary'
            }
          />

          <span
            className={`truncate font-medium ${
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
            className={`shrink-0 text-xs font-semibold ${
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

type QuestionTypeSelectorProps = {
  index: number;
  autoOpen?: boolean;
  isAddQuestionMenu?: boolean;
  onQuestionTypeSelected?: (type: (typeof options)[number]['value']) => void;
  onMenuClose?: () => void;
  className?: string;
};

export default function QuestionTypeSelector({
  index,
  autoOpen = false,
  isAddQuestionMenu = false,
  onQuestionTypeSelected,
  onMenuClose,
  className,
}: QuestionTypeSelectorProps) {
  const { control } = useFormContext();

  const [menuOpen, setMenuOpen] = useState(autoOpen);

  useEffect(() => {
    if (autoOpen) {
      setMenuOpen(true);
    }
  }, [autoOpen]);

  if (isAddQuestionMenu) {
    return (
      <div
        className={className}
        role="menu"
        aria-label="Choose question type"
      >
        {options.map(({ value, label, icon: Icon, short }) => (
          <button
            key={value}
            type="button"
            role="menuitem"
            onClick={() => onQuestionTypeSelected?.(value)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-primary transition hover:bg-teal-700 hover:text-white"
          >
            <span className="flex items-center gap-3">
              <Icon size={18} />
              {label}
            </span>

            {short && <span className="text-xs font-semibold">{short}</span>}
          </button>
        ))}
      </div>
    );
  }

  return (
    <Controller
      name={`p_questions.${index}.question_type`}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          className={className}
          options={options}
          components={{ Option }}
          value={options.find((option) => option.value === field.value)}
          onChange={(option) => {
            if (!option) return;

            field.onChange(option.value);
            setMenuOpen(false);
          }}
          menuIsOpen={menuOpen}
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => {
            setMenuOpen(false);
            onMenuClose?.();
          }}
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
              maxWidth: '100%',
              minWidth: 0,
              overflow: 'hidden',
            }),

            control: (base) => ({
              ...base,
              minHeight: 48,
              height: 48,
              width: '100%',
              maxWidth: '100%',
              minWidth: 0,
              borderRadius: 12,
              backgroundColor: '#E6E3D0',
              border: 'none',
              boxShadow: 'none',
              cursor: 'pointer',
              overflow: 'hidden',

              '&:hover': {
                border: 'none',
              },
            }),

            valueContainer: (base) => ({
              ...base,
              minWidth: 0,
              overflow: 'hidden',
              paddingLeft: 10,
            }),

            singleValue: (base) => ({
              ...base,
              minWidth: 0,
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
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
              flexShrink: 0,
              color: 'var(--color-primary)',

              '&:hover': {
                color: 'var(--color-primary)',
              },
            }),

            menu: (base) => ({
              ...base,
              width: '100%',
              maxWidth: '100%',
              overflow: 'hidden',
              borderRadius: 12,
              marginTop: 6,
              boxShadow: '0 12px 30px rgba(15,23,42,.18)',
            }),

            menuList: (base) => ({
              ...base,
              padding: 4,
              overflowX: 'hidden',
            }),

            option: (base, state) => ({
              ...base,
              padding: '12px 16px',
              margin: '4px',
              width: 'calc(100% - 8px)',
              maxWidth: 'calc(100% - 8px)',
              borderRadius: 8,
              cursor: 'pointer',
              overflow: 'hidden',

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
              <div className="flex min-w-0 items-center gap-2">
                <Icon size={18} className="shrink-0 text-primary" />

                <span className="truncate font-semibold text-primary">
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
