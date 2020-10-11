import React from 'react';
import { render, fireEvent, wait, screen } from '@testing-library/react';
import About from '../components/Welcome.js';

test('Recognizes logged in user', () => {
    const { getByText } = render(<About user={{id:1}} />);
    const button = screen.queryByText("Let's Get Started!", { exact: false });
    expect(button).toBeNull();
})