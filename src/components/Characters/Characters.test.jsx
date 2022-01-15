import { render, screen } from "@testing-library/react";
import { MemoryRouter  } from "react-router-dom";
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import App from '../../App.jsx';

const server = setupServer(
    rest.get('https://rickandmortyapi.com/api/character?page=1', (req, res, ctx) => {
        return res(
            ctx.json({
                info: {
                  pages: 1
                },
                results: [
                  {
                    id: 1,
                    name: 'Rick Sanchez',
                    status: 'Alive',
                    species: 'Human',
                    image: 'img.png'
                  },
                  {
                    id: 2,
                    name: 'Morty Smith',
                    status: 'Alive',
                    species: 'Human',
                    image: 'img2.png'
                  }
                ]
              }
        )
      );
    })
);

describe('Character list test', () => {
    beforeAll(() => {
        server.listen();
    });
    afterAll(() => {
        server.close();
    });

    it('renders an array of characters', async () => {
        render(
            <MemoryRouter initialEntries={['/characters']}>
                <App/>
            </MemoryRouter>
        );
        
        
        await screen.findByText('Rick Sanchez')
        await screen.findByText('Morty Smith')
       
        
    })
    
    it('renders the app', async () => {
        const screen = await render(
            <MemoryRouter initialEntries={['/characters']}>
                <App/>
            </MemoryRouter>
        );
        
        
       expect(screen).toMatchSnapshot
       
        
    })

})
