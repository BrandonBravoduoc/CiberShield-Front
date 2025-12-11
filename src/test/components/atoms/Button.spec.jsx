import React from 'react';
import { render } from '@testing-library/react';
import Button from '../../../components/atoms/Button.jsx';

describe('Button Component', () => {
  it('should render button element', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('should display button text', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.textContent).toContain('Click me');
  });

  it('should apply custom className', () => {
    const { container } = render(<Button className="custom-class">Test</Button>);
    const button = container.querySelector('button');
    expect(button.className).toContain('custom-class');
  });

  it('should be disabled when disabled prop is true', () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const button = container.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});
