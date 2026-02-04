import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MonthSelect } from '../Components/MonthSelect';
import userEvent from '@testing-library/user-event';

describe('MonthSelect', () => {
  it('should render with default placeholder', () => {
    render(<MonthSelect />);
    expect(screen.getByText('Selecione um mês')).toBeInTheDocument();
  });

  it('should render with custom placeholder', () => {
    render(<MonthSelect placeholder="Mês" />);
    expect(screen.getByText('Mês')).toBeInTheDocument();
  });

  it('should call onValueChange when selecting a month', async () => {
    const onValueChange = vi.fn();
    render(<MonthSelect onValueChange={onValueChange} />);
    
    // Abre o select
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    // Seleciona Janeiro
    const option = screen.getByText('Jan');
    await userEvent.click(option);

    expect(onValueChange).toHaveBeenCalledWith('01');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<MonthSelect disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('should show all months', async () => {
    render(<MonthSelect />);
    
    // Abre o select
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    // Verifica se todos os meses estão presentes
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    months.forEach(month => {
      expect(screen.getByText(month)).toBeInTheDocument();
    });
  });
});
