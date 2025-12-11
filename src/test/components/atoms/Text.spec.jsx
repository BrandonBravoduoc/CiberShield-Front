import React from 'react';
import { render } from '@testing-library/react';
import Text from '../../../components/atoms/Text.jsx';

describe('Text Component', () => {
  it('should render text content', () => {
    const { container } = render(<Text>Hello World</Text>);
    expect(container.textContent).toContain('Hello World');
  });

  it('should render h1 variant', () => {
    const { container } = render(<Text variant="h1">Heading 1</Text>);
    const heading = container.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe('Heading 1');
  });

  it('should render p variant', () => {
    const { container } = render(<Text variant="p">Paragraph text</Text>);
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toBe('Paragraph text');
  });

  it('should apply custom className', () => {
    const { container } = render(<Text className="custom-text">Content</Text>);
    const element = container.firstChild;
    expect(element.className).toContain('custom-text');
  });
});
