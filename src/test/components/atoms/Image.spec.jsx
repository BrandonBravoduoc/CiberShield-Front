import React from 'react';
import { render } from '@testing-library/react';
import Image from '../../../components/atoms/Image.jsx';

describe('Image Component', () => {
  it('should render image element', () => {
    const { container } = render(<Image src="https://example.com/image.jpg" alt="Test" />);
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
  });

  it('should have correct alt text', () => {
    const { container } = render(<Image src="https://example.com/image.jpg" alt="Test Image" />);
    const img = container.querySelector('img');
    expect(img.alt).toBe('Test Image');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Image 
        src="https://example.com/image.jpg" 
        alt="Test" 
        className="custom-class"
      />
    );
    const img = container.querySelector('img');
    expect(img.className).toContain('custom-class');
  });
});
