import { render, screen } from "@testing-library/react";
import { MemoryRouter  } from "react-router-dom";
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import App from '../../App.jsx';

const server = setupServer(
    rest.get('https://rickandmortyapi.com/api/character/:id', (req, res, ctx) => {
        return res(
            ctx.json({
            image: 'http://placekitten.com/200/200',
            name: 'Rick Sanchez',
            species: 'Human',
            status: 'Alive'
        })
      );
    })
);

describe('Character detail test', () => {
    beforeAll(() => {
        server.listen();
    });
    afterAll(() => {
        server.close();
    });


    it('renders the app', async () => {
        const screen = await render(
            <MemoryRouter initialEntries={['/characters/1']}>
                <App/>
            </MemoryRouter>
        );
        
        
       expect(screen).toMatchSnapshot
       
        
    })

})
