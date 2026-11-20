import type * as React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary'; pill?: boolean }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; type?: 'text' | 'email' | 'search' | 'password' }
export declare function TextInput(props: TextInputProps): React.ReactElement;
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { options: Array<string | { value: string; label: string }> }
export declare function Select(props: SelectProps): React.ReactElement;
export interface BadgeProps { tone?: 'neutral' | 'accent' | 'primary'; children?: React.ReactNode }
export declare function Badge(props: BadgeProps): React.ReactElement;
declare global { interface Window { BoneKombu: { Button: typeof Button; TextInput: typeof TextInput; Select: typeof Select; Badge: typeof Badge } } }
