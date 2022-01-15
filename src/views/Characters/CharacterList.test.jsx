import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../../App'


const server = setupServer(
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
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
            name: 'Rick Sanchez2',
            status: 'Alive',
            species: 'Human',
            image: 'img2.png'
          }
        ]
      })
    )
  })
)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

it('should fetch and render a character list', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/characters']}>
      <App />
    </MemoryRouter>
  )

  screen.getByText('Characters')

  await screen.findByText('Rick Sanchez')
  await screen.findByText('Rick Sanchez2')
})