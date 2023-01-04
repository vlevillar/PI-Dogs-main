import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { LandingPage } from '../components/LandingPage/LandingPage';

describe('Landing tests', () => {
  test('should render the title', () =>{
    render(
    <BrowserRouter>
    <LandingPage />
    </BrowserRouter>
    );
    const div = screen.getByRole('h1', {name: "landingTitle"});
    expect(div).toBeInTheDocument();
  });
})